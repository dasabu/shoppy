'use server'

import { API_URL } from '@/app/constants/api'
import { getHeaders, post } from '@/app/utils/fetch'
import revalidateProducts from './revalidate-products'

export default async function createProduct(formData: FormData) {
  const response = await post('products', formData)
  const productImage = formData.get('image')
  if (productImage instanceof File && !response.error) {
    await uploadProductImage(response.data.id, productImage)
  }
  // after create a product, revalidate cache (re-execute the "get-products" action)
  revalidateProducts()
  return response
}

async function uploadProductImage(productId: number, file: File) {
  const formData = new FormData()
  formData.append('image', file)
  await fetch(`${API_URL}/products/${productId}/image`, {
    body: formData,
    method: 'POST',
    headers: getHeaders(),
  })
}
