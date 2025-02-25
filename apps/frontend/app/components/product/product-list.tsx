import getProducts from '@/app/actions/get-products.action'
import { Grid2 } from '@mui/material'
import ProductCard from './product-card'

export default async function ProductList() {
  /**
   * This result will be cached when we create new product
   * so that the UI will not update => revalidate cache:
   * 1. add tags for action that we want to re-execute (get-products)
   * 2. when the action that affect the result (create-product) is finish
   * call revalidateTag() and pass the above tag into it
   */
  const products = await getProducts()

  return (
    <Grid2 container spacing={3}>
      {products.map((product) => (
        <Grid2 key={product.id} size={{ sm: 6, lg: 4, xs: 12 }}>
          <ProductCard product={product} />
        </Grid2>
      ))}
    </Grid2>
  )
}
