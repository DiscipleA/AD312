import { createContext, useContext, useMemo, useState } from 'react'

export const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Maya Chen',
    email: 'maya.chen@healthmerge.example',
    themePreference: 'dark',
  })

  const value = useMemo(() => ({ user, setUser }), [user])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function UserProfile() {
  const { user } = useContext(UserContext)

  return (
    <article>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </article>
  )
}
