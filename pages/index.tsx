import type { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from '@tanstack/react-query'

import styles from '../src/styles/Home.module.css'

import { fetchProducts } from '../src/api/fetchProducts'
import { Product, useProductStore } from '../src/zustand/useProductStore'

import { CircularProgress, IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/AddShoppingCart'
import { ShoppingCart } from '../src/components/shoppingCart'
import Image from 'next/image'

const Home: NextPage = () => {

  const { setTitle, title, addProductCart } = useProductStore()
  
  const { data, isLoading } = useQuery({
    queryKey: ['products', title],
    queryFn: () => fetchProducts(title),
    enabled: true
  })

  const addItemCart = (item: Product) => {
    addProductCart({ ...item, amount: 1 })
  }

  const regex = /https?:\/\/[^\s"]+/g

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.fieldMenu}>
        <TextField 
          size='small'
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
          className={styles.searchField}
        />
        <ShoppingCart />
      </nav>

      {isLoading ? <CircularProgress /> : (
        <main className={styles.main}>
          {data ? data.map((item) => (
            <div key={item.id} className={styles.card}>
              <Image 
                src={item.images[0].replace(/[\[\]\\"]/g, '')} 
                alt={item.title}
                width={190}
                height={190}
                priority
                className={styles.img}
              />
              <span className={styles.title}>{item.title}</span>
              <span className={styles.price}>{item.price?.toLocaleString("pt-BR", { currency: 'BRL', style: "currency" })}</span>
              <IconButton 
                className={styles.button} 
                onClick={() => addItemCart(item)}
              >
                <AddIcon />
              </IconButton>
            </div>
          )) : null}
        </main>
      )}
    </div>
  )
}

export default Home
