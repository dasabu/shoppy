'use server'

import { Product } from '../interfaces/product.interface'
import { get } from '../utils/fetch'

export default async function getProducts() {
  return get<Product[]>('products', ['products'])
}
