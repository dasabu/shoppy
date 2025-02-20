import { AUTHENTICATION_COOKIE } from '@/app/_constants/auth'
import { cookies } from 'next/headers'

export default async function authenticated() {
  return !!cookies().get(AUTHENTICATION_COOKIE)?.value
}
