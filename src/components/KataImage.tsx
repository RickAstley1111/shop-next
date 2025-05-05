'use client'

import { productType } from '@/producttype'
import Image from 'next/image'
import React, { useState } from 'react'



function KataImage({product , fillValue} :{product:productType , fillValue:boolean }) {
    
    const [isLoading , setIsLoading] = useState(true)

    return (
            <Image fill={fillValue} alt="content" className={isLoading ? "object-contain blur-2xl scale-110`transition-[1s]" : "object-contain transition-[1s]"} src={`${product?.image}`} onLoadingComplete={()=> setIsLoading(false)} />
    )
}

export default KataImage