import getProducts from '@/app/actions/get-products.action'
import { Grid2 } from '@mui/material'
import ProductCard from './product-card'

export default async function ProductList() {
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
