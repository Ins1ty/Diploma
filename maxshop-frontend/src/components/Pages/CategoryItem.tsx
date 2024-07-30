'use client'

import { CategoryType } from '@/types/Category'
import Link from 'next/link'
import React from 'react'
interface CategoryItemProps {
  category: CategoryType
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <div key={category.name} className="group relative">
            <div className="relative w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75">
              <Link href={`/category/${category.slug}`}>
                <img
                  src={`/images/${category.image}`}
                  alt={category.description}
                  className="h-full w-full object-cover object-center"
                />
              </Link>
            </div>
            <h3 className="mt-6 text-lg text-center text-gray-500 font-bold group-hover:opacity-75">
              <Link href={`/category/${category.slug}`}>
                <span className="absolute inset-0" />
                {category.name}
              </Link>
            </h3>
            <p className="text-base text-center font-semibold text-gray-900">
              {category.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryItem
