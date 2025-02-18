'use client'

import { createTheme } from '@mui/material'

// compile on client side: run at runtime at client side

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default darkTheme
