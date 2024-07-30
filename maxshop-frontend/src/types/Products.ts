export interface ProductType {
  id: number
  name: string
  slug: string
  image: string
  price: number
  description: string
  pivot?: any
  count?: number
  created_at?: Date
  updated_at?: Date
}
