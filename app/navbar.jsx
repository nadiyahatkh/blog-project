"use client"
import Link from 'next/link'
import { useRouter } from 'next/router'
import {FaCartPlus} from 'react-icons/fa'

export default function Navbar(){
    

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Brand</span>
        <div className="flex ml-auto">
        <Link href="/">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/>
        </svg>
        
        </Link>
        <Link href="./cart">
        
        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
        <FaCartPlus className='mb-1'/>
        <span className="absolute top-0 left-100 transform -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-1 bg-yellow-400">4</span>

        </button>
        </Link>
            
        </div>
        </div>
        </nav>

    )
}