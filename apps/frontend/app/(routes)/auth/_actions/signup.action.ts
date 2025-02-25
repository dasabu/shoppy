'use server'

import { FormState } from '@/app/interfaces/form-state.interface'
import { post } from '@/app/utils/fetch'
import { redirect } from 'next/navigation'

export default async function createUser(
  _prevState: FormState,
  formData: FormData
) {
  const { error } = await post('users', formData)
  if (error?.email || error?.password) {
    return { error }
  }
  redirect('/auth/login')
}
