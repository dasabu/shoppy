import CreateProductFab from './components/product/create-product-fab'
import ProductList from './components/product/product-list'

export default async function Home() {
  return (
    <>
      <ProductList />
      <CreateProductFab />
    </>
  )
}
