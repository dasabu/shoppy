'use client'

import { Button, Link, Stack, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useFormState } from 'react-dom'
import login from '../_actions/login.action'

export default function Login() {
  const [state, formAction] = useFormState(login, { error: {} })

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <Typography variant="h5">Login</Typography>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          type="email"
          helperText={state.error?.email}
          error={!!state.error?.email}
        />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          helperText={state.error?.password}
          error={!!state.error?.password}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Link component={NextLink} href="/auth/signup" className="self-center">
          Signup
        </Link>
      </Stack>
    </form>
  )
}
