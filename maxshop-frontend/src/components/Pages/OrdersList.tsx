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

const OrdersList = ({}: OrdersProps) => {
  const { shopData } = useStore()
  const orders = shopData.orders || []
  return (
    <section aria-labelledby="recent-heading" className="mt-16">
      <h2 id="recent-heading" className="sr-only">
        Recent orders
      </h2>
      <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
          {orders.map(order => (
            <div
              key={order.id}
              className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
              <h3 className="sr-only">
                Order placed on{' '}
                <time dateTime={order.created_at}>
                  {new Date(order.created_at).toLocaleDateString('ru-RU')}
                </time>
              </h3>

              <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                  <div>
                    <dt className="font-medium text-gray-900">Номер заказа</dt>
                    <dd className="mt-1 text-gray-500">#{order.id}</dd>
                  </div>
                  <div className="hidden sm:block">
                    <dt className="font-medium text-gray-900">Дата заказа</dt>
                    <dd className="mt-1 text-gray-500">
                      <time dateTime={order.created_at}>
                        {new Date(order.created_at).toLocaleDateString('ru-RU')}
                      </time>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Итоговая цена</dt>
                    <dd className="mt-1 font-medium text-gray-900">
                      {order.total} ₽
                    </dd>
                  </div>
                </dl>

                <Menu as="div" className="relative flex justify-end lg:hidden">
                  <div className="flex items-center">
                    <Menu.Button className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">
                        Options for order {order.number}
                      </span>
                      <EllipsisVerticalIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ focus }: any) => (
                            <a
                              href={order.href}
                              className={classNames(
                                focus
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm',
                              )}>
                              View
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ focus }: any) => (
                            <a
                              href={order.invoiceHref}
                              className={classNames(
                                focus
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm',
                              )}>
                              Invoice
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                {
                  // lg:flex
                }
                <div className="hidden lg:col-span-2 lg:items-center lg:justify-end lg:space-x-4">
                  <a
                    href={order.href}
                    className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span>View Order</span>
                    <span className="sr-only">{order.number}</span>
                  </a>
                  <a
                    href={order.invoiceHref}
                    className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span>View Invoice</span>
                    <span className="sr-only">for order {order.number}</span>
                  </a>
                </div>
              </div>

              {/* Products */}
              <h4 className="sr-only">Items</h4>
              <ul role="list" className="divide-y divide-gray-200">
                {order.products.map((product: any) => (
                  <li key={product.id} className="p-4 sm:p-6">
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
                      <div className="flex items-center">
                        {order.status == 1 ? (
                          <CheckCircleIcon
                            className="h-5 w-5 text-green-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <ClockIcon
                            className="h-5 w-5 text-yellow-500"
                            aria-hidden="true"
                          />
                        )}
                        <p className="ml-2 text-sm font-medium text-gray-500">
                          {order.status == 1 ? 'Выдано' : 'Ожидает'}{' '}
                          <time dateTime={order.updated_at}>
                            {new Date(order.updated_at).toLocaleDateString(
                              'ru-RU',
                            )}
                          </time>
                        </p>
                      </div>

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
          ))}
        </div>
      </div>
    </section>
  )
}

export default OrdersList
