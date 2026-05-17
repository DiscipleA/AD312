import { createContext, useContext, useMemo, useState } from 'react'

// These sample users act like the shared settings records for the app.
// In the "before" version, App would pass one of these objects down through
// Dashboard and Sidebar even though those middle components do not actually
// need the user data. Context lets us store this shared record once in a
// provider, then read it only where it is truly needed.
export const users = [
  {
    id: 'maya',
    name: 'Maya Chen',
    email: 'maya.chen@healthmerge.example',
    role: 'Care Coordinator',
    department: 'Patient Records',
    themePreference: 'clinicalLight',
    accentTone: 'emerald',
    workspaceNote: 'Prioritizes bright, readable patient intake screens.',
    accessLevel: 'Full record access',
  },
  {
    id: 'andre',
    name: 'Andre Patel',
    email: 'andre.patel@healthmerge.example',
    role: 'Clinical Systems Analyst',
    department: 'Provider Integrations',
    themePreference: 'midnightOps',
    accentTone: 'sky',
    workspaceNote: 'Monitors late-night data imports and integration alerts.',
    accessLevel: 'Integration admin',
  },
  {
    id: 'temp',
    name: 'Temporary Staff',
    email: 'temp.access@healthmerge.example',
    role: 'Limited Access User',
    department: 'Records Intake',
    themePreference: 'sunriseReview',
    accentTone: 'violet',
    workspaceNote: 'Uses a warmer review mode for temporary record validation.',
    accessLevel: 'Limited intake access',
  },
]

// The preview modes are intentionally more varied than a basic light/dark pair.
// That makes the assignment concept visible: one context value can control a
// deeply nested interface without drilling props through every component.
export const previewModes = [
  {
    id: 'user',
    label: 'Use User Preference',
    description: 'Resolve the preview from the selected user\'s saved preference.',
  },
  {
    id: 'clinicalLight',
    label: 'Clinical Light',
    description: 'Bright charting mode for daytime clinical work.',
  },
  {
    id: 'midnightOps',
    label: 'Midnight Ops',
    description: 'Dark monitoring mode for integrations and imports.',
  },
  {
    id: 'sunriseReview',
    label: 'Sunrise Review',
    description: 'Warm review mode for intake and auditing.',
  },
  {
    id: 'highContrast',
    label: 'High Contrast',
    description: 'Maximum contrast mode for accessibility checks.',
  },
]


// The explicit modes exclude the special "Use User Preference" option.
// This keeps the UI honest: one control changes the selected user's saved
// preference, while a separate control decides whether the preview should obey
// that preference or override it temporarily.
export const explicitPreviewModes = previewModes.filter((mode) => mode.id !== 'user')

export function createInitialUserPreferences() {
  return users.reduce((preferences, user) => {
    preferences[user.id] = user.themePreference
    return preferences
  }, {})
}

// A null default is useful while learning because it helps catch mistakes.
// If a component calls useUserSettings outside <UserProvider>, the custom hook
// below throws a clear error instead of failing later with an unclear message.
export const UserContext = createContext(null)

export function getUserById(userId) {
  // Unknown IDs fall back to the first valid user. This edge case keeps the UI
  // stable if a route, saved setting, or test accidentally provides a bad ID.
  return users.find((user) => user.id === userId) || users[0]
}

export function getModeById(modeId) {
  return previewModes.find((mode) => mode.id === modeId) || previewModes[0]
}

export function getPreviewTheme(user, overrideTheme = 'user', userPreference) {
  // "Use User Preference" means the preview should respect the selected user's
  // saved preference. The saved preference can be changed in the preview without
  // changing the user identity, which makes the Context state relationship clearer.
  if (overrideTheme === 'user') {
    return getModeById(userPreference || user.themePreference).id === 'user'
      ? 'clinicalLight'
      : getModeById(userPreference || user.themePreference).id
  }

  // Only allow known explicit mode IDs. This protects the className below from
  // becoming an invalid CSS hook and gives tests a clear edge case to verify.
  return getModeById(overrideTheme).id === 'user' ? 'clinicalLight' : getModeById(overrideTheme).id
}

export function getModeLabel(modeId) {
  return getModeById(modeId).label
}

export function describePropPath() {
  // This is the exact prop-drilling path students are refactoring away from.
  return ['App', 'Dashboard', 'Sidebar', 'UserProfile']
}

export function UserProvider({ children, initialUserId = 'maya', initialThemeOverride = 'user' }) {
  // The selected user is shared application state. Without context, App would
  // have to pass this state through Dashboard and Sidebar as a prop.
  const [selectedUserId, setSelectedUserId] = useState(initialUserId)

  // userPreferences is the assignment-specific part of the demo. It shows that
  // context can store editable preferences, not just a fixed user object. Each
  // user keeps a separate saved mode, so switching users reveals different
  // context-driven defaults.
  const [userPreferences, setUserPreferences] = useState(() => createInitialUserPreferences())

  // The selected visual mode is a preview override. Keeping this separate from
  // the saved user preference teaches an important pattern: persistent settings
  // and temporary UI overrides should not be mixed into one unclear state value.
  const [themeOverride, setThemeOverride] = useState(initialThemeOverride)

  // Derive the selected user from the state value. Keeping this logic in the
  // provider means consumers can read a clean user object instead of repeating
  // lookup logic in every component.
  const user = getUserById(selectedUserId)
  const selectedUserPreference = userPreferences[user.id] || user.themePreference
  const previewTheme = getPreviewTheme(user, themeOverride, selectedUserPreference)
  const activeMode = getModeById(previewTheme)

  const setSelectedUserPreference = (modeId) => {
    const safeMode = getModeById(modeId).id === 'user' ? 'clinicalLight' : getModeById(modeId).id

    setUserPreferences((currentPreferences) => ({
      ...currentPreferences,
      [user.id]: safeMode,
    }))
  }

  // useMemo is not required for tiny examples, but it is a good habit for
  // Context providers. If this object were recreated on every render, every
  // consumer would re-render even when the actual context values did not change.
  const value = useMemo(
    () => ({
      user,
      users,
      previewModes,
      explicitPreviewModes,
      selectedUserId,
      setSelectedUserId,
      selectedUserPreference,
      setSelectedUserPreference,
      themeOverride,
      setThemeOverride,
      previewTheme,
      activeMode,
      propPath: describePropPath(),
    }),
    [user, selectedUserId, selectedUserPreference, themeOverride, previewTheme, activeMode],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUserSettings() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUserSettings must be used inside UserProvider')
  }

  return context
}

export function UserControls() {
  // UserControls consumes context directly. Notice that ContextRefactorApp does
  // not pass users, selectedUserId, preferences, or setter functions as props.
  const {
    users: availableUsers,
    explicitPreviewModes: explicitModes,
    selectedUserId,
    setSelectedUserId,
    selectedUserPreference,
    setSelectedUserPreference,
    themeOverride,
    setThemeOverride,
  } = useUserSettings()

  return (
    <div className="context-refactor-controls" aria-label="Context preview controls">
      <div className="context-refactor-control-group user-control-group">
        <span className="context-refactor-control-label">1. Selected user</span>
        <div className="context-refactor-button-row">
          {availableUsers.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              className={`tone-${candidate.accentTone} ${candidate.id === selectedUserId ? 'active' : ''}`}
              onClick={() => setSelectedUserId(candidate.id)}
            >
              {candidate.name}
            </button>
          ))}
        </div>
      </div>

      <div className="context-refactor-control-group preference-control-group">
        <span className="context-refactor-control-label">2. Set this user&apos;s preference</span>
        <div className="context-refactor-button-row preference-row">
          {explicitModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              className={mode.id === selectedUserPreference ? 'active' : ''}
              onClick={() => setSelectedUserPreference(mode.id)}
              title={`Save ${mode.label} as the selected user preference`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="context-refactor-control-group override-control-group">
        <span className="context-refactor-control-label">3. Preview behavior</span>
        <div className="context-refactor-button-row use-preference-row">
          <button
            type="button"
            className={themeOverride === 'user' ? 'active' : ''}
            onClick={() => setThemeOverride('user')}
            title="Use the selected user's saved preference"
          >
            Use User Preference
          </button>
        </div>
        <span className="context-refactor-sub-label">Temporary override modes</span>
        <div className="context-refactor-button-row mode-row">
          {explicitModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              className={mode.id === themeOverride ? 'active' : ''}
              onClick={() => setThemeOverride(mode.id)}
              title={mode.description}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Dashboard() {
  return (
    <section className="context-refactor-dashboard" aria-label="Dashboard component">
      <div>
        <p className="context-refactor-mini-kicker">Dashboard.jsx</p>
        <h4>No user prop needed here</h4>
        <p>
          Dashboard renders the workspace layout, but it does not receive a user object simply to pass it
          to another child component.
        </p>
      </div>
      <Sidebar />
    </section>
  )
}

export function Sidebar() {
  return (
    <aside className="context-refactor-sidebar" aria-label="Sidebar component">
      <p className="context-refactor-mini-kicker">Sidebar.jsx</p>
      <h4>No user prop needed here either</h4>
      <p>
        Sidebar can stay focused on navigation. The deeply nested profile card reads shared state directly
        from context.
      </p>
      <UserProfile />
    </aside>
  )
}

export function UserProfile() {
  // This is the key line of the assignment. UserProfile is deeply nested, but
  // it can read user settings directly from context instead of accepting a user
  // prop from Sidebar, which received it from Dashboard, which received it from App.
  const { user, activeMode } = useUserSettings()

  return (
    <article className={`context-refactor-profile accent-${user.accentTone}`} aria-label="User profile from context">
      <p className="context-refactor-mini-kicker">UserProfile.jsx reads context</p>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <dl>
        <div>
          <dt>Role</dt>
          <dd>{user.role}</dd>
        </div>
        <div>
          <dt>Department</dt>
          <dd>{user.department}</dd>
        </div>
        <div>
          <dt>Access</dt>
          <dd>{user.accessLevel}</dd>
        </div>
        <div>
          <dt>Resolved mode</dt>
          <dd>{activeMode.label}</dd>
        </div>
      </dl>
      <p className="context-refactor-note">{user.workspaceNote}</p>
    </article>
  )
}

function PropDrillingPath() {
  const { propPath } = useUserSettings()

  return (
    <section className="context-refactor-before-box" aria-label="Before refactor explanation">
      <p className="context-refactor-mini-kicker">Before Refactor</p>
      <h3>Prop drilling path</h3>
      <p className="context-refactor-path">{propPath.join(' → ')}</p>
      <p>
        Before context, <strong>Dashboard</strong> and <strong>Sidebar</strong> received <code>user</code>
        only to forward it. After the refactor, the provider owns the shared state and <strong>UserProfile</strong>
        reads it with <code>useContext</code>.
      </p>
    </section>
  )
}

function ProviderShell() {
  const { user, selectedUserPreference, themeOverride, previewTheme, activeMode } = useUserSettings()

  return (
    <div className={`context-refactor-shell mode-${previewTheme} accent-${user.accentTone}`}>
      <header className="context-refactor-shell-header">
        <div>
          <p className="context-refactor-mini-kicker">Context Provider Active</p>
          <h3>HealthMerge Settings Portal</h3>
        </div>
        <span>{user.name} • {activeMode.label}</span>
        <small>Saved preference: {getModeLabel(selectedUserPreference)} · Preview: {themeOverride === 'user' ? 'Using preference' : 'Override active'}</small>
      </header>
      <Dashboard />
    </div>
  )
}

export default function ContextRefactorApp() {
  return (
    <section className="context-refactor-preview-card">
      <p className="context-refactor-kicker">Working Preview</p>
      <h2>Prop Drilling Refactor with Context</h2>
      <p>
        Choose a user, save that user&apos;s preferred mode, then decide whether the preview should use the saved preference or a temporary override. The provider stores shared state, Dashboard and Sidebar avoid pass-through props, and the nested UserProfile reads the user directly with <code>useContext</code>.
      </p>

      <UserProvider>
        <UserControls />
        <PropDrillingPath />
        <ProviderShell />
      </UserProvider>
    </section>
  )
}

