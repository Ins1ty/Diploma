import { ProductType } from './Products'

export interface CategoryType {
  id: number
  name: string
  description: string
  slug: string
  image: string
  products?: Array<ProductType>
  created_at?: Date
  updated_at?: Date
}

export interface ShopType {
  id: number
  name: string
  address: string
}
