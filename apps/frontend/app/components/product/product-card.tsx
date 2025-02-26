import { Product } from '@/app/interfaces/product.interface'
import { Card, Typography } from '@mui/material'

interface ProductProps {
  product: Product
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <Card className="p-4">
      <Typography variant="h4">{product.name}</Typography>
      <Typography>{product.description}</Typography>
      <Typography>${product.price}</Typography>
    </Card>
  )
}
