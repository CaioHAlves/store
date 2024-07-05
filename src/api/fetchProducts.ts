import axios from 'axios'
import { Product } from '../zustand/useProductStore'

export const fetchProducts = async (title?: string) => {
  const response = await axios.get(`https://api.escuelajs.co/api/v1/products/`, {
    params: {
      title
    }
  })
  return response.data as Array<Product>
}