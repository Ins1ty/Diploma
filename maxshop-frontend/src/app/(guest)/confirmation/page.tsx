'use client'

import { useStore } from '@/store/globalStore'
import { useRouter } from 'next/navigation'

const Confirmation = () => {
  const { lastOrder } = useStore()
  const router = useRouter()

  if (!lastOrder) {
    router.push('/')
    return null
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {' '}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-lg font-bold leading-7 text-gray-900">
            Заказ #{lastOrder ? lastOrder.id : ''} успешно оформлен
          </h2>
          <p className="mt-1 text-lg leading-6 text-gray-600 font-semibold">
            Он будет ожидать вас в выбранном магазине по адресу{' '}
            {lastOrder ? lastOrder.shop.address : ''}.{' '}
            <div>Спасибо за покупку!</div>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
