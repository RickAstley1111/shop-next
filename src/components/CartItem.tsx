'use client'
import { productType } from '@/producttype'
import React from 'react'

function CartItem({ product, handleDelete, handleIncrement, handleDecrement }: any) {
    return (
        <div>
            <div className="rounded-lg border border-gray-200 bg-green p-4 shadow-sm green:border-gray-700 green:bg-gray-800 md:p-6">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <a href="#" className="shrink-0 md:order-1 justify-center flex">
                        <img width={150} height={400} src={product?.image} alt="" />
                    </a>

                    <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                            <button type="button" onClick={handleDecrement} id="decrement-button" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 green:border-gray-600 green:bg-gray-700 green:hover:bg-gray-600 green:focus:ring-gray-700">
                                <svg className="h-2.5 w-2.5 text-gray-900 green:text-green" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                </svg>
                            </button>
                            <input type="text" id="counter-input" className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 green:text-green" value={product?.quantity} readOnly />
                            <button onClick={handleIncrement} type="button" id="increment-button" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 green:border-gray-600 green:bg-gray-700 green:hover:bg-gray-600 green:focus:ring-gray-700">
                                <svg className="h-2.5 w-2.5 text-gray-900 green:text-green" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 green:text-green">${(product?.price).toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <h2 className="text-base font-bold text-gray-900 hover:underline cursor-pointer green:text-green">{product?.title}</h2>
                        <p className="text-base font-medium text-gray-900 green:text-green line-clamp-1">{product?.description}</p>

                        <div className="flex items-center">
                            <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline green:text-gray-400 green:hover:text-green"></button>

                            <button onClick={() => handleDelete(product.id)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline green:text-red-500">
                                <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                </svg>
                                Remove
                            </button>

                            <span className="ml-auto">Total: ${(product.price * product.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem