'use server'

import { API_URL } from '@/app/constants/api'
import { FormState } from '@/app/interfaces/form-state.interface'
import { redirect } from 'next/navigation'
import { getErrorMessage } from '@/app/utils/errors'
import { setAuthCookie } from '@/app/actions/set-cookie.action'

export default async function login(_prevState: FormState, formData: FormData) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
  const parsedResponse = await response.json()
  if (!response.ok) {
    return { error: getErrorMessage(parsedResponse) }
  }
  setAuthCookie(response)
  redirect('/')
}
