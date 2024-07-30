'use client'

import React from 'react'

const AboutUs = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 sm:py-40 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
          ООО &quot; Триал-Спорт &quot; - это магазин, который предлагает вам
          широкий ассортимент товаров по доступным ценам.
        </h1>
        <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
          <p className="text-lg leading-8 text-gray-600">
            Триал-Спорт является лишь начиинающим проектом, но мы стремимся к
            тому, чтобы стать лучшими в своем деле. Для нас важно, чтобы наши
            клиенты были довольны качеством товаров и сервисом.
          </p>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Юридический адрес компании ООО «Триал-Спорт»:
            <div>
              193232, г. Санкт-Петербург, пр-кт Большевиков, д. 27 литер а,
              помещ. 24-н.
            </div>
          </p>
        </div>
        <img
          src="/images/about-us.png"
          alt="about-us-image"
          className="mt-10 w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
        />
      </div>
    </div>
  )
}

export default AboutUs
