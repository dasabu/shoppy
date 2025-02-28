'use client'

import { ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import darkTheme from './app.theme'
import { ReactElement } from 'react'
import { AuthContext } from './contexts/auth.context'

interface AppProviderProps {
  children: ReactElement[]
  authenticated: boolean
}

export default function AppProviders({
  children,
  authenticated,
}: AppProviderProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        <AuthContext.Provider value={authenticated}>
          {children}
        </AuthContext.Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
