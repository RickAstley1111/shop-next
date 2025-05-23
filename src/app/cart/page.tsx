'use client'

import CartItem from '@/components/CartItem'
import { productType } from '@/producttype'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

const CartPage = () => {
    const [producte, setProducte] = useState<productType[]>([])
    const [skikda, setSkika] = useState<number>(0)
    const [inputVAl, setInputVal] = useState<string>('')

    useEffect(() => {
        const stored = localStorage.getItem('carts')
        if (stored) {
            setProducte(JSON.parse(stored))
        }
    }, [])

    const handleDelete = (id: number) => {
        const stored = JSON.parse(localStorage.getItem('carts') || '[]')
        const filtered = stored.filter((el: productType) => el.id !== id)
        localStorage.setItem('carts', JSON.stringify(filtered))
        setProducte(filtered)
    }

    const handleIncrement = (id: number) => {
        const updated = producte.map((el) =>
            el.id === id ? { ...el, quantity: el.quantity + 1 } : el
        )
        localStorage.setItem('carts', JSON.stringify(updated))
        setProducte(updated)
    }

    const handleDecrement = (id: number) => {
        const found = producte.find((el) => el.id === id)
        if (found?.quantity === 1) {
            handleDelete(id)
        } else {
            const updated = producte.map((el) =>
                el.id === id ? { ...el, quantity: el.quantity - 1 } : el
            )
            localStorage.setItem('carts', JSON.stringify(updated))
            setProducte(updated)
        }
    }

    const { codes, tax, total, final, pickUp } = useMemo(() => {
        const totalPrice = producte.reduce((sum, el) => sum + el.price * el.quantity, 0)
        const pickUp = totalPrice > 500 ? 'Free' : 99
        const codes = [
            { code: "salom-30", reward: 30 },
            { code: 'salom-40', reward: 40 },
            { code: 'salom-50', reward: 50 },
        ]
        const tax = (totalPrice * 0.05).toFixed(2)
        const total = totalPrice.toFixed(2)
        const final = (totalPrice + (pickUp === 'Free' ? 0 : 99) + (totalPrice * 0.05) - (totalPrice/100*skikda) ).toFixed(2)

        return { codes, tax, total, final, pickUp }
    }, [producte, skikda])

    const RaxmatUlugbek = () => {
        const found = codes.find((el) => el.code === inputVAl)?.reward
        if (found) {
            setSkika(found)
            toast.success('Promokod qabul qilindi')
        } else {
            toast.error('Notogri promokod')
        }
    }

    return (
        <>
            {producte.length === 0 ? (
                <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 bg-white w-full">
                    <div className="text-center">
                        <div className="inline-flex rounded-full bg-yellow-100 p-4">
                            <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
                                <svg
                                    className="w-16 h-16"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">Maxsulot tanlangani yo‘q</h1>
                        <p className="text-slate-600 mt-5 lg:text-lg">
                            <Link className="text-blue-400" href="/allProducts">
                                Maxsulot tanlang
                            </Link>
                        </p>
                    </div>
                </div>
            ) : (
                <section className="bg-white py-38 md:py-16">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>

                        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-6">
                                {producte.map((el) => (
                                    <CartItem
                                        key={el.id}
                                        product={el}
                                        handleDelete={() => handleDelete(el.id)}
                                        handleIncrement={() => handleIncrement(el.id)}
                                        handleDecrement={() => handleDecrement(el.id)}
                                    />
                                ))}
                            </div>

                            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                    <p className="text-xl font-semibold text-gray-900">Order summary</p>

                                    <div className="space-y-4">
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base text-gray-500">Original price</dt>
                                            <dd className="text-base font-medium text-gray-900">${total}</dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base text-gray-500">Savings</dt>
                                            <dd className="text-base font-medium text-green-600">
                                                {skikda === 0 ? 'none' : `-$${(Number(total)/100*skikda).toFixed(2)}`}
                                            </dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base text-gray-500">Store Pickup</dt>
                                            <dd className="text-base font-medium text-gray-900">
                                                {pickUp === 'Free' ? 'Free' : `$${pickUp}`}
                                            </dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base text-gray-500">Tax</dt>
                                            <dd className="text-base font-medium text-gray-900">${tax}</dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                            <dt className="text-base font-bold text-gray-900">Total</dt>
                                            <dd className="text-base font-bold text-gray-900">${final}</dd>
                                        </dl>
                                    </div>

                                    <a
                                        href="#"
                                        className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                                    >
                                        Proceed to Checkout
                                    </a>
                                </div>

                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                    <div>
                                        <label
                                            htmlFor="voucher"
                                            className="mb-2 block text-sm font-medium text-gray-900"
                                        >
                                            Do you have a voucher or gift card?
                                        </label>
                                        <input
                                            onChange={(e) => setInputVal(e.target.value)}
                                            type="text"
                                            id="voucher"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                                        />
                                    </div>
                                    <button
                                        onClick={RaxmatUlugbek}
                                        className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800"
                                    >
                                        Promokod ishlatish
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default CartPage
