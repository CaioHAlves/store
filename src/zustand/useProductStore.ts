import { create } from 'zustand'

export interface Product {
  id: number
  title: string
  creationAt: string
  description: string
  images: Array<string>
  price: number
  updateAt: string
  amount: number
  category: {
    creationAt: string
    id: number
    image: string
    name: string
    updatedAt: string
  }
}

interface ProductStore {
  products: Array<Product>
  addProductCart: (products: Product) => void
  title?: string
  setTitle: (title: string) => void
  removeProductCart: (id: number) => void,
  clearProducts: () => void
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  addProductCart: (product: Product) => set((s) => {
    const findProduct = s.products.find(item => item.id === product.id)

    if (findProduct) {
      findProduct.amount = product.amount + findProduct.amount

      return { products: s.products }
    }

    return { products: s.products.concat(product) }
  }),
  removeProductCart: (id: number) => set((s) => {
    const findProduct = s.products.find(item => item.id === id)

    if (findProduct) {
      findProduct.amount = findProduct.amount - 1

      return !findProduct.amount ? { products: s.products.filter(item => item.id !== id) } : { products: s.products }
    }

    return { products: s.products }
  }),
  setTitle: (title: string) => set({ title }),
  clearProducts: () => set({ products: [] })
}))