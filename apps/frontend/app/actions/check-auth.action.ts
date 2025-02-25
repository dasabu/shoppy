import { AUTHENTICATION_COOKIE } from '@/app/constants/auth'
import { cookies } from 'next/headers'

export default async function checkAuth() {
  return !!cookies().get(AUTHENTICATION_COOKIE)?.value
}
