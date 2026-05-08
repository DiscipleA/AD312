import * as React from 'react'
import { Component, useEffect, useMemo, useState } from 'react'
import * as Babel from '@babel/standalone'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import './editable-code-runner.css'

const EMPTY_MOCK_DATA = Object.freeze([])

function createPreviewRuntime(mockData = EMPTY_MOCK_DATA) {
  class QueryClient {
    constructor(options = {}) {
      this.options = options
    }
  }

  function QueryClientProvider({ children }) {
    return children
  }

  function useQuery(config = {}) {
    const queryKey = Array.isArray(config.queryKey) ? config.queryKey.join(' / ') : 'unknown query'

    return {
      data: mockData,
      isLoading: false,
      isPending: false,
      isError: false,
      error: null,
      status: 'success',
      queryKey,
    }
  }

  async function mockFetch() {
    return {
      ok: true,
      json: async () => mockData,
    }
  }

  return {
    QueryClient,
    QueryClientProvider,
    useQuery,
    fetch: mockFetch,
  }
}

function stripUnsupportedModuleSyntax(code) {
  return code
    .replace(/^\s*import\s+[^;]+;?\s*$/gm, '')
    .replace(/^\s*export\s+default\s+/gm, '')
}

function stripPreviewOnlyComments(code) {
  return code
    .split('\n')
    .filter((line) => !/^\s*\/\/.*$/.test(line))
    .join('\n')
}

function buildPreviewComponent(code, entryComponentName, mockData = EMPTY_MOCK_DATA) {
  const runtime = createPreviewRuntime(mockData)
  const executableCode = stripPreviewOnlyComments(stripUnsupportedModuleSyntax(code))
  const transformed = Babel.transform(executableCode, {
    presets: [['react', { runtime: 'classic' }]],
    filename: 'EditableLectureExample.jsx',
  }).code

  const factory = new Function(
    'React',
    'useState',
    'useRef',
    'useMemo',
    'useEffect',
    'QueryClient',
    'QueryClientProvider',
    'useQuery',
    'fetch',
    `${transformed}\nreturn typeof ${entryComponentName} === 'function' ? ${entryComponentName} : null;`,
  )

  return factory(
    React,
    React.useState,
    React.useRef,
    React.useMemo,
    React.useEffect,
    runtime.QueryClient,
    runtime.QueryClientProvider,
    runtime.useQuery,
    runtime.fetch,
  )
}

class PreviewErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: '' }
  }

  static getDerivedStateFromError(error) {
    return { error: error?.message || 'The preview could not render the edited code.' }
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: '' })
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="editable-preview-error">
          <strong>Preview error</strong>
          <span>{this.state.error}</span>
        </div>
      )
    }

    return this.props.children
  }
}

function PreviewMount({ component: ComponentToRender }) {
  if (!ComponentToRender) {
    return (
      <div className="editable-preview-empty">
        The edited code did not return the expected component yet.
      </div>
    )
  }

  return <ComponentToRender />
}

export default function EditableCodeRunner({
  title,
  initialCode,
  entryComponentName,
  previewLabel = 'Code in Action',
  mockData = EMPTY_MOCK_DATA,
}) {
  const stableMockData = mockData || EMPTY_MOCK_DATA
  const [code, setCode] = useState(initialCode)
  const [compiledComponent, setCompiledComponent] = useState(null)
  const [error, setError] = useState('')
  const [hasChanges, setHasChanges] = useState(false)
  const [editorTheme, setEditorTheme] = useState('dark')
  const [previewResetKey, setPreviewResetKey] = useState(0)

  const extensions = useMemo(() => [javascript({ jsx: true })], [])

  useEffect(() => {
    setCode(initialCode)
    setHasChanges(false)
    setPreviewResetKey((key) => key + 1)
  }, [initialCode])

  useEffect(() => {
    function syncTheme() {
      setEditorTheme(document.querySelector('.app-shell.theme-light') ? 'light' : 'dark')
    }

    syncTheme()
    const observer = new MutationObserver(syncTheme)
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handle = window.setTimeout(() => {
      try {
        const nextComponent = buildPreviewComponent(code, entryComponentName, stableMockData)
        setCompiledComponent(() => nextComponent)
        setError('')
      } catch (nextError) {
        setCompiledComponent(null)
        setError(nextError?.message || 'The edited code could not be compiled.')
      }
    }, 450)

    return () => window.clearTimeout(handle)
  }, [code, entryComponentName, stableMockData])

  useEffect(() => {
    setHasChanges(code !== initialCode)
  }, [code, initialCode])

  function handleReset() {
    // Reset must restore both sides of the interactive example:
    // 1. the editable CodeMirror text, and
    // 2. the compiled Code in Action preview.
    //
    // Without recompiling immediately, a previous preview error can remain visible
    // even after the editor text has returned to the original lecture source.
    setCode(initialCode)
    setHasChanges(false)
    setPreviewResetKey((key) => key + 1)

    try {
      const resetComponent = buildPreviewComponent(initialCode, entryComponentName, stableMockData)
      setCompiledComponent(() => resetComponent)
      setError('')
    } catch (nextError) {
      setCompiledComponent(null)
      setError(nextError?.message || 'The original lecture code could not be compiled after reset.')
    }
  }

  return (
    <div className="editable-runner-shell">
      <div className="editable-runner-header">
        <div>
          <p className="editable-runner-kicker">Editable Code Example</p>
          <h3>{title}</h3>
        </div>
        <button className="sm-button" type="button" onClick={handleReset} disabled={!hasChanges}>
          Reset code
        </button>
      </div>

      <div className="editable-code-window" aria-label={`${title} editable source code`}>
        <CodeMirror
          value={code}
          height="auto"
          minHeight="420px"
          extensions={extensions}
          theme={editorTheme}
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
          }}
          onChange={(value) => setCode(value)}
        />
      </div>

      <div className="editable-runner-status" aria-live="polite">
        {hasChanges ? 'Edited version active. Use Reset code to restore the original example.' : 'Original lecture code is active.'}
      </div>

      <h3 className="sm-subheading">{previewLabel}</h3>
      <div className={error ? 'editable-preview-shell has-error' : 'editable-preview-shell'}>
        {error ? (
          <div className="editable-preview-error">
            <strong>Preview error</strong>
            <span>{error}</span>
          </div>
        ) : (
          <PreviewErrorBoundary resetKey={previewResetKey}>
            <PreviewMount key={previewResetKey} component={compiledComponent} />
          </PreviewErrorBoundary>
        )}
      </div>
    </div>
  )
}

