import Link from 'next/link'
import React from 'react'
import Logo from './../../logo.jpg'
import Image from 'next/image'

function Header() {
    return (

            <header className="text-black body-font shadowк">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link href={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <Image src={Logo} alt="logo" width={60} height={40}/>
                    </Link>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link href={"/"} className="mr-5 hover:text-gray-900">home page</Link>
                        <Link href={"/allProducts"} className="mr-5 hover:text-gray-900">products</Link>
                        <Link href={"/contacts"} className="mr-5 hover:text-gray-900">contacts</Link>
                    </nav>

                    <button className="inline-flex  items-center  border-blue-500 bg-blue-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-transparent rounded hover:text-black text-base mt-4 md:mt-0 transition ease-out">
                        <Link href={"/cart"}>
                            MyBag
                        </Link>
                    </button>


                </div>
            </header>

    )
}

export default Header