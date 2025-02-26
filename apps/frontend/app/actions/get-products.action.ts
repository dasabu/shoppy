'use server'

import { get } from '@/app/utils/fetch'
import { IProduct } from '../interfaces/product.interface'

export default async function getProducts() {
  return get<IProduct[]>('products', ['products'])
}
