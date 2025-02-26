'use client'

import {
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Alert,
} from '@mui/material'
import NextLink from 'next/link'
import { useFormState } from 'react-dom'
import login from '../_actions/login.action'

export default function Login() {
  const [state, formAction] = useFormState(login, { error: '' })

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <Typography variant="h5">Login</Typography>
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
        <Button
          sx={{ marginBottom: '10rem' }}
          type="submit"
          variant="contained"
        >
          Login
        </Button>
        <Link component={NextLink} href="/auth/signup" className="self-center">
          Signup
        </Link>
      </Stack>
    </form>
  )
}
