'use client'

import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CreateProductModal from './create-product-modal'
import { useState } from 'react'

export default function CreateProductFab() {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <>
      <CreateProductModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
      <div className="absolute left-10 bottom-10">
        <Fab color="primary" onClick={() => setOpenModal(true)}>
          <AddIcon />
        </Fab>
      </div>
    </>
  )
}
