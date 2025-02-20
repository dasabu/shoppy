'use server'

import { API_URL } from '@/app/_constants/api'
import { ErrorResponse } from '@/app/_interfaces/error-response.interface'
import { FormState } from '@/app/_interfaces/form-state.interface'
import { redirect } from 'next/navigation'
import { setAuthCookie } from '../../../_action/set-cookie.action'
import { categorizeErrors } from '@/app/_utils/errors'

export default async function login(_prevState: FormState, formData: FormData) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
  const parsedResponse = await response.json()
  if (!response.ok) {
    return { error: categorizeErrors(parsedResponse as ErrorResponse) }
  }
  setAuthCookie(response)
  redirect('/')
}
