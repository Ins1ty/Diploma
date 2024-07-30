'use client'

import React, { useEffect } from 'react'
import CategoryItem from './CategoryItem'
import { useStore } from '@/store/globalStore'
import { useAPI } from '@/hooks/api'
import LoadingSpinner from '../LoadingSpinner'

const CategoryList = () => {
  const { shopData } = useStore()
  const categories = shopData.categories || []

  return (
    <>
      <div className="container mx-auto p-10 px-10 w-100 align-middle">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(category => (
            <CategoryItem
              category={category}
              key={category.slug}></CategoryItem>
          ))}
        </div>
      </div>
    </>
  )
}

export default CategoryList
