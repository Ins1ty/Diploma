'use client'

import React from 'react'
import ProductItem from './ProductItem'
import { ProductType } from '@/types/Products'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useStore } from '@/store/globalStore'
import { ClockIcon, XCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface OrdersProps {}

const FavList = ({}: OrdersProps) => {
  const { shopData } = useStore()
  const favs = shopData.favorites || []
  const products = shopData.categories
    .map((category: any) => category.products)
    .flat() as ProductType[]

  const favProducts = products.filter((product: any) =>
    favs.includes(product.id),
  )

  return (
    <section aria-labelledby="recent-heading" className="mt-16">
      <h2 id="recent-heading" className="sr-only">
        Recent favs
      </h2>
      <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
          <h4 className="sr-only">Items</h4>
          <ul role="list" className="divide-y divide-gray-200 space-y-8 ">
            {favProducts.map((product: any) => (
              <li
                key={product.id}
                className="p-4 sm:p-6 border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                <div className="flex items-center sm:items-start">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                    <img
                      src={`/images/${product.image}`}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-6 flex-1 text-sm">
                    <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                      <h5>
                        {product.pivot.quantity} Х {product.name}
                      </h5>
                      <p className="mt-2 sm:mt-0">{product.price} ₽</p>
                    </div>
                    <p className="hidden text-gray-500 sm:mt-2 sm:block mb-4">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 sm:flex sm:justify-between">
                  <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                    <div className="flex flex-1 justify-center">
                      <Link
                        href={`/product/${product.slug}`}
                        className="whitespace-nowrap text-indigo-600 hover:text-indigo-500">
                        Перейти к товару
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default FavList
