'use client'

import createProduct from '@/app/actions/create-product.action'
import { FormState } from '@/app/interfaces/form-state.interface'
import {
  Alert,
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'

interface CreateProductModalProps {
  open: boolean
  handleClose: () => void
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function CreateProductModal({
  open,
  handleClose,
}: CreateProductModalProps) {
  const [response, setResponse] = useState<FormState>()

  const onClose = () => {
    setResponse(undefined)
    handleClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <form
          action={async (formData) => {
            const response = await createProduct(formData)
            console.log(response)
            setResponse(response)
            if (!response.error) {
              console.log(response)
              onClose()
            }
          }}
          className="w-full max-w-xs"
        >
          <Stack spacing={2}>
            <Typography variant="h5">Add Product</Typography>
            {response?.error && (
              <Alert variant="filled" severity="error">
                {response.error}
              </Alert>
            )}
            <TextField name="name" label="Name" variant="outlined" required />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              required
            />
            <TextField name="price" label="Price" variant="outlined" required />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}
