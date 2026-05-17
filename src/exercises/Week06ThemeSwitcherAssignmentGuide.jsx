import ThemeSwitcherApp from '../assignments/week06/global-theme-switcher/ThemeSwitcherApp'
import ThemeSwitcherTestPanel from './ThemeSwitcherTestPanel'
import appSource from '../assignments/week06/global-theme-switcher/ThemeSwitcherApp.jsx?raw'
import testSource from '../assignments/week06/global-theme-switcher/ThemeSwitcherApp.test.jsx?raw'
import '../styles/week06-theme-switcher-assignment.css'
import CodeBlock from '../components/CodeBlock'

const setupSource = `npm create vite@latest theme-switcher-app -- --template react
cd theme-switcher-app
npm install
npm run dev`

const themeContextSource = `// src/ThemeContext.jsx
import { createContext, useContext, useMemo, useState } from 'react'

const themes = {
  light: {
    id: 'light',
    label: 'Light Mode',
    background: '#ffffff',
    text: '#111827',
  },
  dark: {
    id: 'dark',
    label: 'Dark Mode',
    background: '#111827',
    text: '#f9fafb',
  },
}

export const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState('light')

  const toggleTheme = () => {
    setThemeName((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  const value = useMemo(
    () => ({
      themeName,
      theme: themes[themeName],
      toggleTheme,
    }),
    [themeName],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return context
}`

const appShapeSource = `// src/App.jsx
import { ThemeProvider, useTheme } from './ThemeContext'
import ThemeSwitcher from './ThemeSwitcher'
import './App.css'

function Layout() {
  const { themeName, theme } = useTheme()

  return (
    <main
      className={themeName === 'dark' ? 'dark-mode' : 'light-mode'}
      style={{ background: theme.background, color: theme.text }}
    >
      <h1>Global Theme Switcher</h1>
      <ThemeSwitcher />
    </main>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  )
}`

const switcherSource = `// src/ThemeSwitcher.jsx
import { useTheme } from './ThemeContext'

export default function ThemeSwitcher() {
  const { themeName, toggleTheme } = useTheme()

  return (
    <button type="button" onClick={toggleTheme}>
      {themeName === 'dark' ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
    </button>
  )
}`

export default function Week06ThemeSwitcherAssignmentGuide() {
  return (
    <article className="theme-switcher-assignment-guide">
      <header className="theme-switcher-guide-hero theme-switcher-guide-card">
        <p className="theme-switcher-guide-kicker">AD312 • Week 06 • Assignment 03</p>
        <h1>Building a Global Theme/Dark Mode Switcher</h1>
        <p>
          Build a Vite React application that uses the Context API to manage a global light/dark theme. The theme
          should be available to the whole interface without passing theme props through every component.
        </p>
      </header>

      <section className="theme-switcher-guide-card">
        <h2>Overview</h2>
        <p>
          Dark Mode is a standard feature in modern applications, but implementing it cleanly requires shared state.
          In this assignment, you will create a <code>ThemeContext</code>, provide a toggle function, consume the
          theme in nested components, and optionally persist the user preference.
        </p>
      </section>

      <section className="theme-switcher-guide-card">
        <h2>Objectives</h2>
        <ul className="theme-switcher-guide-checklist">
          <li>Use <code>createContext</code> to establish a global theme state.</li>
          <li>Create a custom <code>ThemeProvider</code> component to manage toggle logic.</li>
          <li>Expose the current theme string and a <code>toggleTheme</code> function through context.</li>
          <li>Wrap the app with <code>&lt;ThemeProvider&gt;</code>.</li>
          <li>Use <code>useContext</code> through a custom <code>useTheme</code> hook.</li>
          <li>Apply dynamic classes, CSS variables, or inline styles based on the theme value.</li>
          <li>Include at least three normal Vitest cases and three edge Vitest cases.</li>
        </ul>
      </section>

      <section className="theme-switcher-guide-card">
        <h2>Standalone Vite Setup</h2>
        <p>
          Build the standalone version in a fresh Vite React project. Keep component files as <code>.jsx</code>
          files so Vite Hot Module Replacement can update them cleanly while you work.
        </p>
        <CodeBlock language="bash" label="Vite Setup" code={setupSource} />
      </section>

      <ThemeSwitcherApp />
      <ThemeSwitcherTestPanel />

      <section className="theme-switcher-guide-card">
        <h2>Create the ThemeContext</h2>
        <p>
          Start with a context file that owns the theme state. The provider should expose both the current theme and
          the function that flips between light and dark mode.
        </p>
        <CodeBlock language="jsx" label="src/ThemeContext.jsx" code={themeContextSource} />
      </section>

      <section className="theme-switcher-guide-card">
        <h2>Wrap the Application</h2>
        <p>
          The provider belongs near the top of the app so every page, layout, card, and button can read the same
          global theme value.
        </p>
        <CodeBlock language="jsx" label="src/App.jsx" code={appShapeSource} />
      </section>

      <section className="theme-switcher-guide-card">
        <h2>Create the ThemeSwitcher Component</h2>
        <p>
          The switcher is a deeply reusable consumer. It reads <code>themeName</code> and <code>toggleTheme</code>
          from context instead of receiving them as props.
        </p>
        <CodeBlock language="jsx" label="src/ThemeSwitcher.jsx" code={switcherSource} />
      </section>

      <section className="theme-switcher-guide-card">
        <h2>Completed Portfolio Preview Source</h2>
        <p>
          The in-app preview expands the standalone assignment with a richer dashboard so students can see multiple
          nested components responding to the same global theme context.
        </p>
        <CodeBlock language="jsx" label="src/assignments/week06/global-theme-switcher/ThemeSwitcherApp.jsx" code={appSource} />
      </section>

      <section className="theme-switcher-guide-card">
        <h2>Official Vitest Tests</h2>
        <p>
          These tests cover normal rendering, toggling, nested consumers, direct light/dark controls, invalid theme
          values, localStorage preference handling, and the error case for consuming context outside the provider.
        </p>
        <CodeBlock language="jsx" label="src/assignments/week06/global-theme-switcher/ThemeSwitcherApp.test.jsx" code={testSource} />
      </section>

      <section className="theme-switcher-guide-card theme-switcher-guide-grid-two">
        <div>
          <h2>Manual Testing</h2>
          <ul>
            <li>Confirm the app loads in Light Mode by default.</li>
            <li>Click the main toggle and confirm the entire preview changes to Dark Mode.</li>
            <li>Use the direct Light and Dark buttons to confirm explicit state updates.</li>
            <li>Confirm nested cards and the deep consumer panel update without receiving theme props.</li>
            <li>Run the Vitest file and confirm normal and edge tests pass.</li>
          </ul>
        </div>
        <div>
          <h2>Takeaways</h2>
          <p>
            Context is useful when many components need the same value. A global theme is a strong use case because
            the background, text, cards, buttons, and deeply nested widgets all need to respond to one shared state.
            The finished app should be readable in both the course shell's light/dark mode and the assignment preview's
            own light/dark mode.
          </p>
        </div>
      </section>
    </article>
  )
}
