'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useStore } from '@/store/globalStore'
import { useAPI } from '@/hooks/api'
import { useCart } from '@/hooks/cart'
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'
import { useAuth } from '@/hooks/auth'

export default function ProductScreen({
  params,
}: {
  params: { slug: string }
}) {
  const { user } = useAuth({})
  const { shopData } = useStore()
  const { addProduct } = useCart()
  const { addToFavorite, removeFavorite, isLoadingFavorite } = useAPI()
  const shops = shopData.shops || []
  const slug = params.slug
  // const category = shopData.categories.find(item => item.slug === slug)
  const product = shopData.categories
    .map(category => category.products)
    .flat()
    .find(item => item && item.slug === slug)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const isFav =
      product &&
      shopData &&
      shopData.favorites &&
      shopData.favorites.length > 0 &&
      shopData.favorites.includes(product.id)
    setIsFavorite(isFav || false)
  }, [shopData.favorites, product])

  if (!product) {
    return <h1>Продукт не найден</h1>
  }

  return (
    <div className="bg-white">
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={`/images/${product.image}`}
                alt={product.name}
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Product details */}
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.name}
                </h1>
              </div>
            </div>

            <p className="mt-6 text-gray-500">{product.description}</p>
            <p className="mt-6 text-gray-500 font-semibold">
              Цена: {product.price} ₽
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {user && !isFavorite && (
                <button
                  onClick={() => addToFavorite(product.id)}
                  className="bg-green-400 hover:bg-green-500 rounded-md py-2 px-4 mt-4 text-white flex justify-center gap-x-2">
                  <HeartIcon className="h-6 w-6" />В избранное
                </button>
              )}
              {user && isFavorite && (
                <button
                  disabled={isLoadingFavorite}
                  onClick={() => removeFavorite(product.id)}
                  className="bg-orange-400 hover:bg-orange-500 rounded-md py-2 px-4 mt-4 text-white flex justify-center gap-x-2">
                  <HeartIcon className="h-6 w-6" />
                  Убрать из избранного
                </button>
              )}
              <button
                disabled={isLoadingFavorite}
                onClick={() => addProduct(product.id)}
                className="bg-blue-400 hover:bg-blue-500 rounded-md py-2 px-4 mt-4 text-white flex justify-center gap-x-2">
                <ShoppingBagIcon className="h-6 w-6" />В корзину
              </button>
            </div>
            <div className="pr-10 pl-10 text-xl text-left my-7">
              <hr className="h-1 my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
              <div>Адреса магазинов:</div>
              {shops.map(shop => (
                <div key={shop.id}>{shop.address}</div>
              ))}
              <div>режим работы:</div>
              <div>Ежедневно 10:00-20:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
