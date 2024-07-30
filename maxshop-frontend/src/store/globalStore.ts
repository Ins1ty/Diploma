import { CategoryType, ShopType } from '@/types/Category'
import { ProductType } from '@/types/Products'
import { create } from 'zustand'

type Store = {
  lastOrder: any
  setLastOrder: (order: any) => void
  shopData: {
    categories: Array<CategoryType>
    shops: Array<ShopType>
    favorites: Array<number>
    orders: Array<any>
  }
  setShopData: (shopData: {
    categories: Array<CategoryType>
    shops: Array<ShopType>
    favorites: Array<number>
    orders: Array<any>
  }) => void
  setFavorites: (favorites: Array<number>) => void
  count: number
  inc: () => void
}

export const useStore = create<Store>()(set => ({
  lastOrder: null,
  setLastOrder: lastOrder => set({ lastOrder }),
  shopData: {
    categories: [],
    shops: [],
    favorites: [],
    orders: [],
  },
  setShopData: shopData => set({ shopData }),
  setFavorites: favorites =>
    set(state => ({ shopData: { ...state.shopData, favorites } })),
  count: 1,
  inc: () => set(state => ({ count: state.count + 1 })),
}))
