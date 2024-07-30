'use client'

import React from 'react'
import ProductItem from './ProductItem'
import { ProductType } from '@/types/Products'
interface ProductProps {
  products: ProductType[]
}

const ProductList = ({ products }: ProductProps) => {
  return (
    <div className="container mx-auto p-10 px-10 m-10 w-100">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map(product => (
          <ProductItem product={product} key={product.slug}></ProductItem>
        ))}
      </div>
    </div>
  )
}

export default ProductList
