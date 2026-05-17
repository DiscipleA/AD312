import { createContext, useContext, useEffect, useMemo, useState } from 'react'

// -----------------------------------------------------------------------------
// Theme registry
// -----------------------------------------------------------------------------
// A production app usually needs more than a boolean like isDarkMode. A boolean
// can say which mode is active, but it cannot describe all of the visual tokens
// the rest of the UI needs. These theme objects keep the theme name, label,
// icon, background, surfaces, text colors, borders, and button colors together.
//
// This is the central idea of the assignment: many different components need
// the same theme value, so the data should live in one shared provider instead
// of being passed manually through every layer of the component tree.
export const themes = {
  light: {
    id: 'light',
    label: 'Light Mode',
    icon: '☀️',
    description: 'Bright clinical workspace for daytime review.',
    background: '#f8fafc',
    surface: '#ffffff',
    surfaceAlt: '#eaf4ff',
    text: '#0f172a',
    mutedText: '#475569',
    border: '#bfdbfe',
    accent: '#2563eb',
    accentSoft: '#dbeafe',
    buttonText: '#ffffff',
  },
  dark: {
    id: 'dark',
    label: 'Dark Mode',
    icon: '🌙',
    description: 'Low-glare operations workspace for extended monitoring.',
    background: '#07111f',
    surface: '#0f1b2d',
    surfaceAlt: '#17263d',
    text: '#f8fafc',
    mutedText: '#cbd5e1',
    border: '#355070',
    accent: '#38bdf8',
    accentSoft: '#082f49',
    buttonText: '#06121f',
  },
}

// These dashboard sections are intentionally separate from the provider. They
// represent normal app content. The content does not know how the theme is
// stored, but each rendered card can still become theme-aware by reading the
// ThemeContext through useTheme().
export const dashboardSections = [
  {
    title: 'Patient Intake',
    detail: 'Front-desk staff can scan new records without receiving theme props.',
  },
  {
    title: 'Provider Review',
    detail: 'Clinicians see the same global theme inside nested dashboard cards.',
  },
  {
    title: 'Audit Trail',
    detail: 'Compliance widgets read the context directly instead of drilling props.',
  },
]

// createContext(null) gives the context a clear "not connected yet" default.
// That matters for teaching because the custom useTheme() hook can detect the
// mistake and throw a helpful error when a component tries to consume the theme
// outside of <ThemeProvider>.
export const ThemeContext = createContext(null)

export function normalizeThemeName(themeName) {
  // Context values may come from user clicks, saved localStorage strings, test
  // props, route params, or future API data. Normalizing protects the app from
  // invalid strings and guarantees that consumers only receive supported modes.
  return themeName === 'dark' ? 'dark' : 'light'
}

export function getTheme(themeName) {
  // Consumers should not have to know how to validate a theme name. This helper
  // returns a complete theme object every time, even if the incoming value is
  // malformed. That keeps rendering safe and predictable.
  return themes[normalizeThemeName(themeName)]
}

export function getOppositeTheme(themeName) {
  // The toggle button does not need its own separate state. It derives the next
  // target from the current theme, which keeps the UI and provider state in sync.
  return normalizeThemeName(themeName) === 'dark' ? 'light' : 'dark'
}

export function getStoredTheme(storageKey = 'ad312-week06-theme') {
  // localStorage is a browser API. Tests, server rendering, and build tooling may
  // evaluate modules in environments where window does not exist. The guard keeps
  // this helper safe anywhere the file is imported.
  if (typeof window === 'undefined' || !window.localStorage) {
    return null
  }

  const savedTheme = window.localStorage.getItem(storageKey)

  // Only trusted values are allowed back into provider state. Any malformed saved
  // value is ignored so the app can fall back to its normal default.
  return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null
}

export function ThemeProvider({
  children,
  initialTheme = 'light',
  persistPreference = false,
  storageKey = 'ad312-week06-theme',
}) {
  // useState accepts an initializer function. React runs this function only on
  // the first render, which is the right moment to check localStorage. Checking
  // localStorage during every render would be unnecessary work.
  const [themeName, setThemeName] = useState(() => {
    if (persistPreference) {
      return getStoredTheme(storageKey) || normalizeThemeName(initialTheme)
    }

    return normalizeThemeName(initialTheme)
  })

  // These values are derived from state. They do not need their own useState
  // calls because React can calculate them from the current themeName.
  const theme = getTheme(themeName)
  const nextThemeName = getOppositeTheme(themeName)

  const toggleTheme = () => {
    // Functional state updates are safest when the new value depends on the old
    // value. React passes the latest currentTheme into this callback, even if
    // multiple updates happen quickly.
    setThemeName((currentTheme) => getOppositeTheme(currentTheme))
  }

  const setLightTheme = () => setThemeName('light')
  const setDarkTheme = () => setThemeName('dark')

  useEffect(() => {
    // Persistence is optional in the assignment. When it is enabled, this effect
    // writes the current theme after React commits the render. The guard prevents
    // crashes in test environments and keeps persistence opt-in.
    if (!persistPreference || typeof window === 'undefined' || !window.localStorage) {
      return
    }

    window.localStorage.setItem(storageKey, themeName)
  }, [persistPreference, storageKey, themeName])

  const value = useMemo(
    () => ({
      // The current mode string, useful for class names and labels.
      themeName,
      // The full token object, useful for CSS variables and inline styles.
      theme,
      // The registry is exposed so consumers can label the next toggle target.
      themes,
      nextThemeName,
      // Mutators are exposed through context so deeply nested components can
      // update global state without receiving handlers from every parent.
      toggleTheme,
      setLightTheme,
      setDarkTheme,
      persistPreference,
      storageKey,
    }),
    [themeName, theme, nextThemeName, persistPreference, storageKey],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return context
}

export function ThemeSwitcher() {
  // ThemeSwitcher is a consumer. It does not receive themeName, colors, or event
  // handlers from DashboardShell. Instead, it reads the shared provider value
  // directly with useTheme(). This is the refactor that removes prop drilling.
  const { themeName, theme, nextThemeName, toggleTheme, setLightTheme, setDarkTheme } = useTheme()

  return (
    <section className="theme-switcher-toolbar" aria-label="Theme switcher controls">
      <div>
        <p className="theme-switcher-eyebrow">Global Context Value</p>
        <h3>{theme.icon} {theme.label}</h3>
        <p>{theme.description}</p>
      </div>

      <div className="theme-switcher-buttons" aria-label="Theme buttons">
        <button type="button" className="theme-switcher-primary" onClick={toggleTheme}>
          Switch to {themes[nextThemeName].label}
        </button>
        <button type="button" className={themeName === 'light' ? 'active' : ''} onClick={setLightTheme}>
          ☀️ Light
        </button>
        <button type="button" className={themeName === 'dark' ? 'active' : ''} onClick={setDarkTheme}>
          🌙 Dark
        </button>
      </div>
    </section>
  )
}

export function HeaderStatus() {
  // The header is another consumer. It proves the same provider value can be
  // shared with layout-level UI without passing props from ThemeWorkspace.
  const { themeName, theme } = useTheme()

  return (
    <header className="theme-switcher-header">
      <div>
        <p className="theme-switcher-eyebrow">AD312 Theme Workspace</p>
        <h2>Global Theme/Dark Mode Switcher</h2>
        <p>
          The header reads <strong>{theme.label}</strong> from context. No theme prop is passed through the
          dashboard tree.
        </p>
      </div>
      <span className="theme-switcher-pill">theme: {themeName}</span>
    </header>
  )
}

export function DashboardShell() {
  const { theme } = useTheme()

  return (
    <main className="theme-switcher-dashboard" aria-label="Dashboard shell">
      <ThemeSwitcher />

      <section className="theme-switcher-grid" aria-label="Theme-aware dashboard cards">
        {dashboardSections.map((section) => (
          <article key={section.title} className="theme-switcher-card">
            <span className="theme-switcher-card-dot" aria-hidden="true" />
            <h3>{section.title}</h3>
            <p>{section.detail}</p>
          </article>
        ))}
      </section>

      <NestedPreferencePanel />
      <p className="theme-switcher-note">
        CSS variables currently resolve to <code>{theme.background}</code> for the page background and{' '}
        <code>{theme.text}</code> for primary text.
      </p>
    </main>
  )
}

export function NestedPreferencePanel() {
  // This is the deepest visible consumer in the preview. In a prop-drilled app,
  // ThemeWorkspace would pass theme props to DashboardShell, then to another
  // child, and finally here. Context lets this component read the global value
  // exactly where it is needed.
  const { themeName, theme, nextThemeName } = useTheme()

  return (
    <aside className="theme-switcher-nested-panel" aria-label="Nested theme consumer">
      <p className="theme-switcher-eyebrow">Deep Consumer</p>
      <h3>ThemeSwitcher.jsx reads context directly</h3>
      <p>
        This nested panel uses <code>useTheme()</code> to read <strong>{themeName}</strong> mode. The next toggle
        target is <strong>{nextThemeName}</strong>.
      </p>
      <div className="theme-switcher-token-list">
        <span>Surface: {theme.surface}</span>
        <span>Accent: {theme.accent}</span>
        <span>Border: {theme.border}</span>
      </div>
    </aside>
  )
}

export default function ThemeSwitcherApp({
  initialTheme = 'light',
  persistPreference = false,
  storageKey = 'ad312-week06-theme',
}) {
  return (
    <ThemeProvider initialTheme={initialTheme} persistPreference={persistPreference} storageKey={storageKey}>
      <ThemeWorkspace />
    </ThemeProvider>
  )
}

export function ThemeWorkspace() {
  const { themeName, theme } = useTheme()

  return (
    <div
      className={`theme-switcher-preview theme-switcher-preview-${themeName}`}
      style={{
        // CSS variables let the React state control a whole visual system without
        // putting inline color styles on every single child. Children only need
        // normal class names, while the provider decides which token values are
        // active for the current theme.
        '--theme-bg': theme.background,
        '--theme-surface': theme.surface,
        '--theme-surface-alt': theme.surfaceAlt,
        '--theme-text': theme.text,
        '--theme-muted': theme.mutedText,
        '--theme-border': theme.border,
        '--theme-accent': theme.accent,
        '--theme-accent-soft': theme.accentSoft,
        '--theme-button-text': theme.buttonText,
      }}
    >
      <HeaderStatus />
      <DashboardShell />
    </div>
  )
}
