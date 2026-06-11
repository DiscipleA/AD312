import { useLocalStorage } from './useLocalStorage'

export default function PreferenceExample() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  return (
    <button type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  )
}
