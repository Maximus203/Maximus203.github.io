'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'fullstack' | 'frontend' | 'backend'

interface ThemeContextType {
 theme: Theme
 setTheme: (theme: Theme) => void
 isDark: boolean
 toggleDark: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
 const [theme, setTheme] = useState<Theme>('fullstack')
 const [isDark, setIsDark] = useState(false)

 useEffect(() => {
  // Load theme from localStorage or system preference
  const savedTheme = localStorage.getItem('portfolio-theme') as Theme
  const savedDark = localStorage.getItem('portfolio-dark') === 'true'

  if (savedTheme) {
   setTheme(savedTheme)
  }

  if (savedDark) {
   setIsDark(savedDark)
  } else {
   // Check system preference
   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
   setIsDark(prefersDark)
  }
 }, [])

 useEffect(() => {
  // Apply theme to document
  const body = document.body
  const html = document.documentElement

  // Remove existing theme classes
  body.classList.remove('theme-fullstack', 'theme-frontend', 'theme-backend')
  html.classList.remove('dark')

  // Add current theme class
  body.classList.add(`theme-${theme}`)

  // Add dark class if needed
  if (isDark) {
   html.classList.add('dark')
  }

  // Save to localStorage
  localStorage.setItem('portfolio-theme', theme)
  localStorage.setItem('portfolio-dark', isDark.toString())
 }, [theme, isDark])

 const handleSetTheme = (newTheme: Theme) => {
  setTheme(newTheme)
 }

 const toggleDark = () => {
  setIsDark(!isDark)
 }

 return (
  <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, isDark, toggleDark }}>
   {children}
  </ThemeContext.Provider>
 )
}

export function useTheme() {
 const context = useContext(ThemeContext)
 if (context === undefined) {
  throw new Error('useTheme must be used within a ThemeProvider')
 }
 return context
}