import React from 'react'
import Item from './Item'
import { productType } from '@/producttype'

async function ProductsList() {
    const res = await fetch("https://fakestoreapi.com/products")
    if (!res.ok) throw new Error("Failed to fetch products")
    const products = await res.json()

    return (
        <div className="px-2">
            <ul className="max-w-[1500px] mx-auto grid 
                grid-cols-[repeat(auto-fit,minmax(280px,1fr))] 
                gap-5">
                {
                    products.map((el: productType) => (
                        <li key={el.id}>
                            <Item products={el} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ProductsList