import { createContext, useContext } from 'react'

const ThemeContext = createContext()

/**
 * ThemeProvider — locked to light mode for the boxy off-white design.
 * The toggle and isDark are kept for API compatibility but do nothing.
 */
export function ThemeProvider({ children }) {
  const theme = 'light'
  const isDark = false
  const toggle = () => {} // no-op — single theme

  return (
    <ThemeContext.Provider value={{ theme, toggle, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}