import { toastifyConfig } from '@/lib/toastifyConfig'
import { useStore } from '@/store/globalStore'
import { OrderItem } from '@/types/Order'
import { ProductType } from '@/types/Products'
import { toast } from 'react-toastify'
import useLocalStorageState from 'use-local-storage-state'

export const useCart = () => {
  const { shopData } = useStore()
  const [cart, setCart] = useLocalStorageState<OrderItem[]>('cart', {
    defaultValue: [],
  })

  const addProduct = (productId: number) => {
    const existingProduct = cart.find(item => item.id === productId)
    if (existingProduct) {
      const updatedCart = cart.map(item => {
        if (item.id === productId) {
          return { ...item, count: item.quantity + 1 }
        }
        return item
      })
      setCart(updatedCart)
    } else {
      setCart([...cart, { id: productId, quantity: 1 }])
    }
    toast.success('Товар добавлен в корзину', toastifyConfig)
  }

  const removeProduct = (productId: number) => {
    const existingProduct = cart.find(item => item.id === productId)
    if (existingProduct) {
      const updatedCart = cart.map(item => {
        if (item.id === productId) {
          return { ...item, count: item.quantity - 1 }
        }
        return item
      })
      setCart(updatedCart.filter(item => item.quantity > 0))
    }
    toast.success('Товар удален из корзины', toastifyConfig)
  }

  const getProductCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0)
  }

  const clearCart = () => {
    setCart([])
  }

  const listProducts = () => {
    return cart.map(item => {
      const product = shopData.categories
        .map(category => category.products)
        .flat()
        .find(product => product && product.id === item.id)
      return { ...product, count: item.quantity } as ProductType
    })
  }

  return {
    cart,
    addProduct,
    getProductCount,
    clearCart,
    listProducts,
    removeProduct,
  }
}
