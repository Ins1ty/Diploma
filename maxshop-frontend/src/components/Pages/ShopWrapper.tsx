'use client'

import { useAPI } from '@/hooks/api'
import { useStore } from '@/store/globalStore'
import React, { useEffect } from 'react'
import LoadingSpinner from '../LoadingSpinner'

const ShopWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoadingShopData, listShopData } = useAPI()
  const { shopData } = useStore()

  useEffect(() => {
    if (shopData.categories.length === 0) {
      listShopData()
    }
  }, [])

  if (isLoadingShopData) {
    return (
      <>
        <LoadingSpinner />
      </>
    )
  }

  return <>{children}</>
}

export default ShopWrapper
