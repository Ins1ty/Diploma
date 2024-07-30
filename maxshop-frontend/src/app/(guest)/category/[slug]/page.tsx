'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import ProductList from '@/components/Pages/ProductList'
import { useAPI } from '@/hooks/api'
import { useStore } from '@/store/globalStore'

export default function CategoryScreen({
  params,
}: {
  params: { slug: string }
}) {
  const { shopData } = useStore()
  const slug = params.slug
  const category = shopData.categories.find(item => item.slug === slug)
  const categoryProducts = category?.products || []

  if (!category) {
    return <h1>Каталог не найден</h1>
  }

  return (
    <div>
      <div className="containter mx-auto">
        <ProductList products={categoryProducts} />
      </div>
    </div>
  )
}
