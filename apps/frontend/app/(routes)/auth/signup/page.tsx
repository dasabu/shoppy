'use client'

import {
  Alert,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import NextLink from 'next/link'
import { useFormState } from 'react-dom'
import signup from '../_actions/signup.action'

export default function Signup() {
  const [state, formAction] = useFormState(signup, { error: '' })

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <Typography variant="h5">Sign Up</Typography>
        {state?.error && (
          <Alert variant="filled" severity="error">
            {state.error}
          </Alert>
        )}
        <TextField name="email" label="Email" variant="outlined" type="text" />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
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
