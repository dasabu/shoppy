import getProducts from '@/app/actions/get-products.action'
import ProductsGrid from './products-grid'

export default async function Products() {
  /**
   * This result will be cached when we create new product
   * so that the UI will not update => revalidate cache:
   * 1. add tags for action that we want to re-execute (get-products)
   * 2. when the action that affect the result (create-product) is finish
   * call revalidateTag() and pass the above tag into it
   */
  const products = await getProducts()

  return <ProductsGrid products={products} />
}
