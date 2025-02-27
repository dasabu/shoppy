import { cookies } from 'next/headers'
import { API_URL } from '../constants/api'
import { getErrorMessage } from './errors'

export const getHeaders = () => ({
  Cookie: cookies().toString(),
})

export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data
  const response = await fetch(`${API_URL}/${path}`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const parsedResponse = await response.json()
  if (!response.ok) {
    return { error: getErrorMessage(parsedResponse) }
  }
  return { error: '', data: parsedResponse }
}

export const get = async <T>(path: string, tags?: string[]) => {
  const response = await fetch(`${API_URL}/${path}`, {
    headers: { ...getHeaders() },
    next: { tags },
  })
  return response.json() as T
}
