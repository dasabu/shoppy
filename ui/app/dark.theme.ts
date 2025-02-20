'use client'

import { createTheme, ThemeOptions } from '@mui/material'

// compile on client side: run at runtime at client side

const darkTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default darkTheme
