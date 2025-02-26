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
import { CSSProperties, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

interface CreateProductModalProps {
  open: boolean
  handleClose: () => void
}

const modalStyles = {
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

const fileInputStyles: CSSProperties = {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
}

export default function CreateProductModal({
  open,
  handleClose,
}: CreateProductModalProps) {
  const [response, setResponse] = useState<FormState>()
  const [fileName, setFileName] = useState<string>('')

  const onClose = () => {
    setResponse(undefined)
    setFileName('')
    handleClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyles}>
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
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Upload File
              <input
                type="file"
                name="image"
                style={fileInputStyles}
                onChange={(e) =>
                  e.target.files && setFileName(e.target.files[0].name)
                }
              ></input>
            </Button>
            <Typography>{fileName}</Typography>
            <Button type="submit" variant="contained" className="mt-6">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}
