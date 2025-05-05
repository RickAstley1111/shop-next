'use client'

import KataImage from '@/components/KataImage'
import { productType } from '@/producttype'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Page() {
  const params = useParams()
  const { productId } = params
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<productType>({
    id: 0,
    title: "",
    price: 0,
    category: "",
    description: "",
    image: "",
    quantity:0,
    rating: {
      rate: 0,
      count: 0
    }
  })

  async function fetcher() {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${productId}`)
      if (!res.ok) throw new Error("Failed to fetch product")
      const data = await res.json()
      return data
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetcher().then((res) => setProduct(res))
  }, [])

  return (
    <>
      {loading ? (
        <div className='flex justify-center items-center h-[500px] px-4'>
          <div className='w-[150px] h-[150px]'>
            <Image
              className='object-contain animate-spin'
              width={150}
              height={150}
              src="https://i.pinimg.com/736x/e0/35/1c/e0351ca0b460534eff2019c42a854a45.jpg"
              alt="loading"
            />
          </div>
        </div>
      ) : (
        <div className="w-full px-4 py-8 max-w-[1500px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            <div className="w-full max-w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] relative">
              <KataImage product={product} fillValue={true} />
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-5xl text-center lg:text-left">{product.title}</h1>
              <h2 className="text-xl sm:text-2xl lg:text-4xl text-gray-600 font-semibold text-center lg:text-left">
                {product.price}$
              </h2>
              <p className="text-sm sm:text-base text-gray-700 text-center lg:text-left">
                {product.description}
              </p>
              <Link href="/" className="text-indigo-600 underline text-center lg:text-left mt-2">Go back</Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Page