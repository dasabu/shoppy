import { AUTHENTICATION_COOKIE } from '@/app/_constants/auth'
import { cookies } from 'next/headers'

export default async function logout() {
  cookies().delete(AUTHENTICATION_COOKIE)
}
