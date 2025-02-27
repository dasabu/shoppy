'use client'

import { Grid2 } from '@mui/material'
import Product from './product'
import { IProduct } from '@/app/interfaces/product.interface'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { API_URL } from '@/app/constants/api'
import revalidateProducts from '@/app/actions/revalidate-products'

export default function ProductsGrid({ products }: { products: IProduct[] }) {
  useEffect(() => {
    const socket = io(API_URL)
    socket.on('productUpdated', () => {
      revalidateProducts()
    })

    return () => {
      socket?.disconnect()
    }
  }, [])

  return (
    <Grid2
      container
      spacing={3}
      sx={{
        height: '85vh',
        overflow: 'scroll',
        // Hide scrollbar on webkit browser
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none', // hide scrollbar on IE/Edge
        scrollbarWidth: 'none', // hide scrollbar on Firefox
      }}
    >
      {products.map((product) => (
        <Grid2 key={product.id} size={{ sm: 6, lg: 4, xs: 12 }}>
          <Product product={product} />
        </Grid2>
      ))}
    </Grid2>
  )
}
