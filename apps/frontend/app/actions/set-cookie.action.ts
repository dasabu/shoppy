import { AUTHENTICATION_COOKIE } from '@/app/constants/auth'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'

export const setAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get('Set-Cookie')
  if (setCookieHeader) {
    const token = setCookieHeader.split(';')[0].split('=')[1]
    cookies().set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    })
  }
}
