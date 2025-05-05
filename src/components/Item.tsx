import { productType } from '@/producttype'
import React from 'react'
import KataImage from './KataImage'
import Link from 'next/link'

function Item({ products }: { products: productType }) {
    return (
        <Link href={`/products/${products.id}`}>
            <div className="p-4 shadow flex flex-col mb-6 h-[26rem] hover:scale-[1.02] transition rounded-lg bg-white">
                <div className="rounded-lg h-[60%] relative">
                    <KataImage fillValue={true} product={products} />
                </div>
                <h2 className="text-lg font-medium text-gray-900 mt-4 line-clamp-1">{products.title}</h2>
                <p className="text-sm text-gray-700 mt-2 line-clamp-2">{products.description}</p>
                <span className="text-indigo-500 inline-flex items-center mt-auto text-sm">
                    Learn More
                   
                </span>
            </div>
        </Link>
    )
}

export default Item