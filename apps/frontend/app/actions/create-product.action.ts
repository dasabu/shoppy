'use server'

import { revalidateTag } from 'next/cache'
import { post } from '../utils/fetch'

export default async function createProduct(formData: FormData) {
  const response = post('products', formData)
  // after create a product, revalidate cache (re-execute the "get-products" action)
  revalidateTag('products')
  return response
}
