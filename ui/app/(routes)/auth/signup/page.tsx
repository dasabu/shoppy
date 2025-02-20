'use client'

import { Button, Link, Stack, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useFormState } from 'react-dom'
import signup from './signup.action'

export default function Signup() {
  const [state, formAction] = useFormState(signup, { error: {} })

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <Typography variant="h5">Sign Up</Typography>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          type="text"
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
          Signup
        </Button>
        <Link component={NextLink} href="/auth/login" className="self-center">
          Login
        </Link>
      </Stack>
    </form>
  )
}
