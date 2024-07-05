import IconShoppingCart from '@mui/icons-material/ShoppingCart'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Button, Drawer, IconButton } from '@mui/material'
import styles from '../styles/ShoppingCart.module.css'
import { useState } from 'react'
import { Product, useProductStore } from '../zustand/useProductStore'
import Image from 'next/image';

export function ShoppingCart() {

  const { products, addProductCart, removeProductCart, clearProducts } = useProductStore()

  const [open, setOpen] = useState(false)

  const addMoreItemCart = (item: Product) => {
    addProductCart({ ...item })
  }

  const removeItemCard = (id: number) => {
    removeProductCart(id)
  }

  const finalizePurchase = () => {
    setOpen(!open)
    clearProducts()
  }

  return (
    <>
      <IconButton 
        className={styles.iconButton} 
        size='small' 
        onClick={() => setOpen(!open)}
        id="button-cart"
      >
        <IconShoppingCart color='primary' />
      </IconButton>
      <Drawer
        anchor='right'
        open={open}
        onClose={() => setOpen(!open)}
      >
        <span className={styles.titleDrawer}>Cart</span>
        <div className={styles.drawer}>

          {products ? products.map(item => (
            <div key={item.id} className={styles.card}>
              <Image 
                src={item.images[0].replace(/[\[\]\\"]/g, '')} 
                alt={item.title}
                width={190}
                height={190}
                priority
              />
              <span className={styles.title}>{item.title}</span>
              <span className={styles.price}>{(item.price * item.amount)?.toLocaleString("pt-BR", { currency: 'BRL', style: "currency" })}</span>
              
              <div className={styles.actionsCard}>
                <IconButton onClick={() => removeItemCard(item.id)} id="remove">
                  <RemoveIcon />
                </IconButton>
                <span>{item.amount}</span>
                <IconButton onClick={() => addMoreItemCart(item)} id="add">
                  <AddIcon />
                </IconButton>
              </div>
            </div>
          )) : null}
        </div>
          <Button color='primary' variant='contained' className={styles.btnFinish} onClick={finalizePurchase}>
            Finalize purchase
          </Button>
      </Drawer>
    </>
  )
}