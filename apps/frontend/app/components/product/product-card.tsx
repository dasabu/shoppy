import { API_URL } from '@/app/constants/api'
import { Product } from '@/app/interfaces/product.interface'
import { Card, Stack, Typography } from '@mui/material'
import Image from 'next/image'

interface ProductProps {
  product: Product
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <Card className="p-4">
      <Stack gap={2}>
        <Typography variant="h4">{product.name}</Typography>
        {product.imageExists && (
          <Image
            src={`${API_URL}/images/products/${product.id}.jpeg`}
            width="0"
            height="0"
            className="w-full h-auto"
            alt={`${product.name}-image`}
            sizes="100vw"
          />
        )}
        <Typography>{product.description}</Typography>
        <Typography>${product.price}</Typography>
      </Stack>
    </Card>
  )
}
