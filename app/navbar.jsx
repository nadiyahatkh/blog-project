"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react' // Import useRouter untuk mendapatkan informasi rute saat ini


export default function Navbar() {
    const router = useRouter();
    const [isLoginPage, setIsLoginPage] = useState(false);

    useEffect(() => {
        // Set isLoginPage berdasarkan path saat ini
        setIsLoginPage(router.pathname === '/login');
    }, [router.pathname]);

    return (
        <nav className="border-gray-200 shadow-md">
            <div className={`max-w-screen-xl flex ${isLoginPage ? 'justify-center' : 'justify-between'} items-center mx-auto p-4`}>
                <img src="./logo-symbol.png" alt="" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-300">Brand</span>
                {!isLoginPage && (
                    <div className="flex items-center ml-auto space-x-6">
                        <Link href="/">
                            <button className="flex flex-col items-center text-gray-600 hover:text-blue-800">
                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5" />
                                </svg>
                                <span className="text-xs">Produk</span>
                            </button>
                        </Link>
                        <Link href="./cart">
                            <button className="flex flex-col items-center text-gray-600 hover:text-blue-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                <span className="text-xs">Keranjang</span>
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}
