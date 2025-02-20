'use server'

import { FormState } from '@/app/_interfaces/form-state.interface'
import { post } from '@/app/_common/_utils/fetch'
import { redirect } from 'next/navigation'

export default async function createUser(
  _prevState: FormState,
  formData: FormData
) {
  const { error } = await post('users', formData)
  if (error?.email || error?.password) {
    return { error }
  }
  redirect('/')
}
