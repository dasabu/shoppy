import { API_URL } from '../constants/api'

export const getProductImageUrl = (productId: number) => {
  return `${API_URL}/images/products/${productId}.jpeg`
}
