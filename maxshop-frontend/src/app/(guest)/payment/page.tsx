'use client'

import { useCart } from '@/hooks/cart'
import * as Yup from 'yup'
import axios, { AxiosError } from 'axios'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/globalStore'
import { useAuth } from '@/hooks/auth'
import { Order, OrderItem } from '@/types/Order'
import { useAPI } from '@/hooks/api'

export default function Payment() {
  const { user } = useAuth({})
  const { getProductCount, clearCart, listProducts, removeProduct } = useCart()
  const { shopData } = useStore()
  const { submitOrder, submitOrderGuest } = useAPI()
  const shops = shopData.shops || []

  const router = useRouter()

  const submitForm = async (
    values: Order,
    { setSubmitting, setErrors }: FormikHelpers<Order>,
  ): Promise<any> => {
    try {
      // make array of id and quantity
      const products = listProducts().map(item => ({
        id: item.id,
        quantity: item.count || 1,
      }))
      let finalValues = { ...values, products: products } as Order
      let res = user
        ? await submitOrder(finalValues)
        : await submitOrderGuest(finalValues)
      if (res) {
        clearCart()
        router.push('/confirmation')
      }
    } catch (error: Error | AxiosError | any) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setErrors(error.response?.data?.errors)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const RegisterSchema = Yup.object().shape({
    name: user
      ? Yup.string().optional()
      : Yup.string().required('Поле ФИО обязательно для заполнения.'),
    email: user
      ? Yup.string().optional()
      : Yup.string()
          .email('Неверная Электронная почта')
          .required('Поле Электронная почта обязательно для заполнения.'),
    shop_id: Yup.number().min(1, 'Выберите магазин'),
  })

  return (
    <Formik
      onSubmit={submitForm}
      validationSchema={RegisterSchema}
      initialValues={{
        name: '',
        email: '',
        shop_id: 0,
        products: Array<OrderItem>(),
      }}>
      <Form className="space-y-4">
        <div className="space-y-12 pl-5 pr-5">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Оформление заказа
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Пожалуйста, выберите магазин, с которого вы хотите забрать заказ,
              и укажите свои персональные данные.
            </p>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Персональные данные
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Ф.И.О.
                </label>
                <div className="mt-2">
                  {!user ? (
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  ) : (
                    <span className="px-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      {user?.name}
                    </span>
                  )}
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="text-xs text-red-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Электронная почта
                </label>
                <div className="mt-2">
                  {!user ? (
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  ) : (
                    <span className="px-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      {user?.email}
                    </span>
                  )}
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="text-xs text-red-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Страна
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option>Россия</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Город
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option>Ставрополь</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="shop_id"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Магазин
                </label>
                <div className="mt-2">
                  <Field
                    as="select"
                    id="shop_id"
                    name="shop_id"
                    autoComplete="shop_id"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value={0}>Выберите магазин</option>
                    {shops.map(shop => (
                      <option value={shop.id} key={shop.id}>
                        {shop.address}
                      </option>
                    ))}
                  </Field>
                </div>
                <ErrorMessage
                  name="shop_id"
                  component="span"
                  className="text-xs text-red-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-start gap-x-6 mb-6 pl-6">
          <button
            disabled={getProductCount() === 0}
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Подтвердить заказ
          </button>
        </div>
      </Form>
    </Formik>
  )
}
