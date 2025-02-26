import { Grid2, Stack, Typography } from '@mui/material'
import getProduct from '../_action/get-product.action'
import Image from 'next/image'
import { getProductImageUrl } from '@/app/utils/product'

interface SingleProductProps {
  params: { productId: number }
}

export default async function SingleProduct({ params }: SingleProductProps) {
  const product = await getProduct(+params.productId)

  return (
    <Grid2 container marginBottom="2rem" rowGap={3}>
      {product.imageExists && (
        <Grid2 size={{ md: 6, xs: 12 }}>
          <Image
            src={getProductImageUrl(product.id)}
            alt={`${product.name}-image`}
            width={0}
            height={0}
            className="w-3/4 sm:w-3/4 h-auto"
            sizes="100vw"
          />
        </Grid2>
      )}
      <Grid2 size={{ md: 6, xs: 12 }}>
        <Stack gap={3}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography variant="h4">${product.price}</Typography>
        </Stack>
      </Grid2>
    </Grid2>
  )
}
