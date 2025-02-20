'use server'

import { get } from '../_common/_utils/fetch'

export default async function getMe() {
  return get('users/me')
}
