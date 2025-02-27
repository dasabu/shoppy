'use client'

import { Button } from '@mui/material'
import getStripe from '../utils/stripe'
import checkout from '../actions/checkout'

export default function Checkout({ productId }: { productId: number }) {
  const handleCheckout = async () => {
    const session = await checkout(productId)
    const stripe = await getStripe()
    await stripe?.redirectToCheckout({ sessionId: session.data.id })
  }

  return (
    <Button
      variant="contained"
      className="max-w-[25%]"
      onClick={handleCheckout}
    >
      Buy now
    </Button>
  )
}
