import axios from '@/lib/axios'
import { toastifyConfig } from '@/lib/toastifyConfig'
import { useStore } from '@/store/globalStore'
import { Order } from '@/types/Order'
import { useState } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'

export const useAPI = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [isLoadingShopData, setIsLoadingShopData] = useState(false)
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)
  const [isLoadingOrder, setIsLoadingOrder] = useState(false)

  const { setShopData, setFavorites, setLastOrder } = useStore()

  const listShopData = async () => {
    try {
      if (isLoadingShopData) return
      setIsLoadingShopData(true)
      const result = await axios.get('/api/shop/')
      if (result) {
        setShopData(result.data)
      }
      setIsLoadingShopData(false)
    } catch (error) {
      throw error
    }
  }

  const addToFavorite = async (id: number) => {
    try {
      if (isLoadingFavorite) return
      setIsLoadingFavorite(true)
      await csrf()
      const result = await axios.post('/api/favorites/add', { id })
      if (result.status === 200) {
        setFavorites(result.data || [])
        toast.success('Добавлено в избранное', toastifyConfig)
      } else {
        toast.error('Ошибка добавления в избранное', toastifyConfig)
      }
      setIsLoadingFavorite(false)
    } catch (error) {
      setIsLoadingFavorite(false)
      toast.error('Ошибка добавления в избранное', toastifyConfig)
      throw error
    }
  }

  const removeFavorite = async (id: number) => {
    try {
      if (isLoadingFavorite) return
      setIsLoadingFavorite(true)
      await csrf()
      const result = await axios.post('/api/favorites/remove', { id })
      if (result.status === 200) {
        setFavorites(result.data || [])
        toast.success('Удалено из избранного', toastifyConfig)
      } else {
        toast.error('Ошибка удаления из избранного', toastifyConfig)
      }
      setIsLoadingFavorite(false)
    } catch (error) {
      setIsLoadingFavorite(false)
      toast.error('Ошибка удаления из избранного', toastifyConfig)
      throw error
    }
  }

  const submitOrder = async (data: Order): Promise<boolean> => {
    let result = false
    try {
      if (isLoadingOrder) return result
      setIsLoadingOrder(true)
      await csrf()
      const res = await axios.post('/api/orders', data)
      if (res.status === 201) {
        toast.success('Заказ отправлен', toastifyConfig)
        setLastOrder(res.data)
        listShopData()

        result = true
      } else {
        toast.error('Ошибка отправки заказа', toastifyConfig)
      }
      setIsLoadingOrder(false)
    } catch (error) {
      throw error
    }
    return result
  }

  const submitOrderGuest = async (data: Order): Promise<boolean> => {
    let result = false
    try {
      if (isLoadingOrder) return result
      setIsLoadingOrder(true)
      await csrf()
      const res = await axios.post('/api/orders/guest', data)
      if (res.status === 201) {
        toast.success('Заказ отправлен', toastifyConfig)
        setLastOrder(res.data)
        listShopData()
        result = true
      } else {
        toast.error('Ошибка отправки заказа', toastifyConfig)
      }
      setIsLoadingOrder(false)
    } catch (error) {
      throw error
    }
    return result
  }

  const addCategory = async (data: { name: string; email: string }) => {
    try {
      if (isLoadingShopData) return
      setIsLoadingShopData(true)
      await csrf()
      const res = await axios.post('/categories/add', data)
      if (res.status === 200) {
        toast.success('Категория добавлена', toastifyConfig)
        listShopData()
      } else {
        toast.error('Ошибка добавления категории', toastifyConfig)
      }
      setIsLoadingShopData(false)
    } catch (error) {
      toast.error('Ошибка добавления категории', toastifyConfig)
      throw error
    }
  }
  return {
    isLoadingShopData,
    listShopData,
    addCategory,
    isLoadingFavorite,
    addToFavorite,
    removeFavorite,
    submitOrder,
    submitOrderGuest,
    isLoadingOrder,
  }
}
