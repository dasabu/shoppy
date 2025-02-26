import { IProduct } from '@/app/interfaces/product.interface'
import { get } from '@/app/utils/fetch'

export default async function getProduct(productId: number) {
  return get<IProduct>(`products/${productId}`)
}
