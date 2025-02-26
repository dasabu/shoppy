import CreateProductFab from './components/product/create-product-fab'
import Products from './components/product/products'

export default async function Home() {
  return (
    <>
      <Products />
      <CreateProductFab />
    </>
  )
}
