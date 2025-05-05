'use client'

import KataImage from '@/components/KataImage'
import { productType } from '@/producttype'
import Image from 'next/image'
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
    quantity: 0,
    rating: {
      rate: 0,
      count: 0
    }
  })

  useEffect(() => {
    async function fetcher() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`)
        if (!res.ok) throw new Error("Failed to fetch product")
        const productik = await res.json()
        setProduct(productik)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetcher()
  }, [])


  const handleClick = () => {
    const products = JSON.parse(localStorage.getItem("carts") as string) || []





    const ExsitedProduct = products.find(
      (el: productType) => el.id === product?.id
    )


    if (ExsitedProduct) {
      const updatedProducts = products.map((el: productType) => {
        if (el.id == product?.id) {
          return {
            ...el,
            quantity: el.quantity + 1
          }
        } else {
          return el
        }
      });

      console.log(updatedProducts);
      localStorage.setItem("carts", JSON.stringify(updatedProducts))
    } else {
      const data = [...products, { ...product, quantity: 1 }]
      localStorage.setItem("carts", JSON.stringify(data))
    }

    console.log(products);
  }

  return (
    <>
      {loading ? (
        <div className='flex justify-center items-center h-screen px-4'>
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
        <div className="fixed inset-0 backdrop-blur-3xl bg-white/30 flex items-center justify-center px-4 py-6 z-50">
          <div className="w-full max-w-[1000px] bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6 overflow-y-auto max-h-[90vh]">
            <div className='w-full md:w-1/2 relative h-[300px] sm:h-[400px] md:h-[500px] shadow rounded-md overflow-hidden'>
              <KataImage product={product} fillValue={true} />
            </div>
            <div className='w-full md:w-1/2 flex flex-col justify-between'>
              <div className='flex flex-col gap-4'>
                <h1 className='font-extrabold text-2xl sm:text-3xl md:text-4xl line-clamp-3'>
                  {product?.title}
                </h1>
                <h2 className='font-bold text-xl text-gray-700'>
                  {product.price}$
                </h2>

                <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
                  <p className="font-medium">
                  </p>
                  <p className="text-blue-600 cursor-pointer underline">
                    See all {product?.rating.count} reviews
                  </p>
                </div>

                <p className='text-gray-700 text-sm sm:text-base mt-2 line-clamp-[10]'>
                  {product?.description}
                </p>
              </div>
              <div className='flex flex-col sm:flex-row gap-3 mt-6'>

                <button
                  className='w-full sm:w-auto border-blue-600 border p-2 rounded bg-blue-600 font-bold text-white hover:bg-transparent hover:text-blue-600 transition'
                  onClick={() => window.location.reload()}>
                  See details
                </button>

                <button onClick={() => handleClick()} className='w-full sm:w-auto border-blue-600 border p-2 rounded bg-blue-600 font-bold text-white hover:bg-transparent hover:text-blue-600 transition'>
                  add to cart
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Page