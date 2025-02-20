'use server'

import { get } from '../_utils/fetch'

export default async function getMe() {
  return get('users/me')
}
