'use client'

import { ProductType } from '@/types/Products'
import Link from 'next/link'
import React from 'react'
interface ProductProps {
  product: ProductType
}

const ProductItem = ({ product }: ProductProps) => {
  return (
    <>
      <div className="max-w-sm rounded-md overflow-hidden shadow-lg bg-[#d8e4ec]">
        <ul>
          <li>
            <Link href={`/product/${product.slug}`}>
              <img
                src={`/images/${product.image}`}
                alt={product.description}
                className="shadow shadow-black w-full h-96 object-contain bg-white hover:opacity-75"
              />
            </Link>
          </li>
          <li>
            <div className="flex flex-col justify-center items-center p-5">
              <Link href={`/product/${product.slug}`}>
                <h2 className="font-bold text-center text-xl mb-2">
                  {product.name}
                </h2>
                <hr className="h-1 bg-gray-100 border-0 rounded dark:bg-gray-700"></hr>
                <h3 className="text-center mb-2 mt-2 font-bold">
                  {product.price}₽
                </h3>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ProductItem
