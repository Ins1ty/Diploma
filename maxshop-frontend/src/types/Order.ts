export interface OrderItem {
  id: number
  quantity: number
}

export interface Order {
  name: string
  email: string
  shop_id: number
  products: OrderItem[]
}
