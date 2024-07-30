'use client'

import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import React from 'react'
import { ChevronDownIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'
import CartButton from '../CartButton'
import Dropdown from '../Dropdown'
import { DropdownButton } from '../DropdownLink'

const Header = () => {
  const { user, logout } = useAuth({ middleware: 'guest' })
  return (
    <>
      <div className="flex h-12 items-center pb-1 justify-between shadow-md top top--inner bg-[#163e73]">
        <ul className="flex items-center">
          <li className="m-4">
            <Link href="/" className="text-lg font-bold font-serif text-white">
              Триал-Спорт
            </Link>
          </li>
          <li className="m-4">
            <Link
              href="/about-us"
              className=" text-sm font-bold font-serif text-white">
              О нас
            </Link>
          </li>
        </ul>
        <div className="top-0 right-0 px-6 py-4 sm:block">
          {user ? (
            <ul className="flex items-center">
              <li className="">
                <CartButton />
              </li>
              <li className="ml-4">
                {/* Settings Dropdown */}
                <div className="flex sm:items-center sm:ml-6 max-w-md">
                  <Dropdown
                    align="right"
                    width={48}
                    trigger={
                      <button className="flex items-center text-sm font-medium text-white hover:text-gray-400 focus:outline-none transition duration-150 ease-in-out">
                        <div>{user?.name}</div>

                        <div className="ml-1">
                          <ChevronDownIcon className="h-4 w-4 text-white" />
                        </div>
                      </button>
                    }>
                    <DropdownButton>
                      <Link href="/dashboard">История заказов</Link>
                    </DropdownButton>
                    <DropdownButton>
                      <Link href="/dashboard/favorites">Избранные товары</Link>
                    </DropdownButton>
                    {/* Authentication */}
                    <DropdownButton onClick={logout}>Logout</DropdownButton>
                  </Dropdown>
                </div>
              </li>
            </ul>
          ) : (
            <ul className="flex items-center">
              <li className="">
                <CartButton />
              </li>

              <li className="ml-4">
                <Link
                  href="/login"
                  className="ml-4 text-sm text-white underline">
                  Войти
                </Link>
              </li>

              <li className="ml-4">
                <Link
                  href="/register"
                  className="ml-4 text-sm text-white underline">
                  Регистрация
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default Header
