import Head from 'next/head'
import CategoryList from '@/components/Pages/CategoryList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Триал-Спорт - магазин спортивных товаров',
  description: 'Триал-Спорт - магазин спортивных товаров',
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Триал-Спорт</title>
      </Head>
      <CategoryList />
    </>
  )
}
