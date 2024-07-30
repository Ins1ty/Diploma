'use client'
import { useCart } from '@/hooks/cart'
import { Popover, Transition } from '@headlessui/react'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React, { Fragment } from 'react'

const CartButton = () => {
  const { getProductCount, clearCart, listProducts, removeProduct } = useCart()
  const products = listProducts() || []
  return (
    <Popover className="relative max-w-sm">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? 'text-white' : 'text-white/90'}
                group inline-flex shrink-0 items-center justify-center text-white gap-x-2`}>
            <ShoppingCartIcon className="h-6 w-6 text-white" />
            <span className="text-white bg-red-500 rounded-full px-2">
              {getProductCount()}
            </span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1">
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-64 transform px-4 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                <div className="bg-gray-50 p-4">
                  <button
                    onClick={clearCart}
                    className="w-full flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50">
                    <span className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">
                        Очистить корзину
                      </span>
                    </span>
                  </button>
                </div>
                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                  {products.length === 0 && (
                    <div className="flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-900">
                        Корзина пуста
                      </span>
                    </div>
                  )}
                  {products.map(item => (
                    <>
                      <hr className="py-1" />
                      <Link
                        key={item.name}
                        href={`/product/${item.slug}`}
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50">
                        <div className="flex flex-col gap-y-8 h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          <img
                            src={`/images/${item.image}`}
                            alt={item.name}
                            className="h-10 w-10 object-cover rounded-lg"
                          />{' '}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {item.count} шт.
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {item.price}₽
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            Итого{' '}
                            {item.count ? item.price * item.count : item.price}₽
                          </p>
                        </div>
                      </Link>
                      <button
                        onClick={() => removeProduct(item.id)}
                        className="w-full flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50">
                        <span className="text-sm font-medium text-gray-900">
                          Удалить
                        </span>
                      </button>
                    </>
                  ))}
                </div>
                <div
                  className={`${
                    products.length === 0 ? 'hidden' : 'block'
                  } bg-gray-50 p-4`}>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      Итого
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {products.reduce(
                        (acc, item) => acc + item.price * (item.count || 1),
                        0,
                      )}
                      ₽
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    className="w-full flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out bg-blue-400 hover:bg-blue-500 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50 disabled:bg-gray-400">
                    <span className="flex items-center">
                      <span className="text-sm font-medium  text-white">
                        Перейти в корзину
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default CartButton
