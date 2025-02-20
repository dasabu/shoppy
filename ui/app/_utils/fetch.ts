import { cookies } from 'next/headers'
import { categorizeErrors } from './errors'
import { API_URL } from '../_constants/api'
import { ErrorResponse } from '../_interfaces/error-response.interface'

const getHeaders = () => ({
  Cookie: cookies().toString(),
})

export const post = async (path: string, formData: FormData) => {
  const response = await fetch(`${API_URL}/${path}`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
  const parsedResponse = await response.json()
  if (!response.ok) {
    return { error: categorizeErrors(parsedResponse as ErrorResponse) }
  }
  return { error: {} }
}

export const get = async (path: string) => {
  const response = await fetch(`${API_URL}/${path}`, {
    headers: { ...getHeaders() },
  })
  return response.json()
}
