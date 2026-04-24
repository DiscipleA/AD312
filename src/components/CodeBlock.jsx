import { useMemo } from 'react'
import '../styles/code-block.css'

const TOKEN_REGEX = /(\/\/.*$|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:import|from|export|default|return|const|let|var|function|if|else|for|while|switch|case|break|continue|new|class|extends|try|catch|finally|throw|await|async)\b|\b(?:true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b|<\/?[A-Za-z][\w:-]*|[A-Za-z_$][\w$]*(?=\s*\()|=>|===|!==|==|!=|<=|>=|\+\+|--|&&|\|\||[{}[\]();,.<>:+\-*/=%!?&|])/gm

function classifyToken(token) {
  if (/^\/\//.test(token) || /^\/\*/.test(token)) return 'comment'
  if (/^("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)$/.test(token)) return 'string'
  if (/^<\/?[A-Za-z][\w:-]*/.test(token)) return 'tag'
  if (/^(import|from|export|default|return|const|let|var|function|if|else|for|while|switch|case|break|continue|new|class|extends|try|catch|finally|throw|await|async)$/.test(token)) return 'keyword'
  if (/^(true|false|null|undefined)$/.test(token)) return 'literal'
  if (/^\d+(?:\.\d+)?$/.test(token)) return 'number'
  if (/^[A-Za-z_$][\w$]*$/.test(token)) return 'call'
  if (/^(=>|===|!==|==|!=|<=|>=|\+\+|--|&&|\|\||[{}[\]();,.<>:+\-*/=%!?&|])$/.test(token)) return 'operator'
  return 'plain'
}

function tokenizeLine(line) {
  const tokens = []
  let lastIndex = 0
  let match

  TOKEN_REGEX.lastIndex = 0

  while ((match = TOKEN_REGEX.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'plain', value: line.slice(lastIndex, match.index) })
    }

    tokens.push({
      type: classifyToken(match[0]),
      value: match[0],
    })

    lastIndex = TOKEN_REGEX.lastIndex
  }

  if (lastIndex < line.length) {
    tokens.push({ type: 'plain', value: line.slice(lastIndex) })
  }

  if (tokens.length === 0) {
    tokens.push({ type: 'plain', value: '' })
  }

  return tokens
}

export default function CodeBlock({ code, language = 'jsx', label, showLineNumbers = true }) {
  const lines = useMemo(() => code.replace(/\r\n/g, '\n').split('\n'), [code])

  return (
    <div className="code-block-shell" data-language={language}>
      <div className="code-block-toolbar">
        <span className="code-block-pill">{label || language.toUpperCase()}</span>
      </div>

      <pre className="code-block-pre">
        <code>
          {lines.map((line, lineIndex) => (
            <div className="code-block-line" key={`${language}-${lineIndex}`}>
              {showLineNumbers ? (
                <span className="code-block-line-number">{lineIndex + 1}</span>
              ) : null}
              <span className="code-block-line-content">
                {tokenizeLine(line).map((token, tokenIndex) => (
                  <span
                    key={`${language}-${lineIndex}-${tokenIndex}`}
                    className={`code-token code-token-${token.type}`}
                  >
                    {token.value || '\u00a0'}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
