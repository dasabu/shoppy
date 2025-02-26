'use client'

import { IProduct } from '@/app/interfaces/product.interface'
import { getProductImageUrl } from '@/app/utils/product'
import { Card, CardActionArea, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ProductProps {
  product: IProduct
}

export default function Product({ product }: ProductProps) {
  const router = useRouter()
  return (
    <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>
      <Card className="p-4">
        <Stack gap={2}>
          <Typography variant="h4">{product.name}</Typography>
          {product.imageExists && (
            <Image
              src={getProductImageUrl(product.id)}
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
    </CardActionArea>
  )
}
