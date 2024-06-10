"use client";
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [activeButton, setActiveButton] = useState('');
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginPage, setIsLoginPage] = useState(false);
    const { status } = useSession();

    useEffect(() => {
        setIsLoginPage(router.pathname === '/login');
    }, [router.pathname]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    return (
        <nav className="border-gray-200 shadow-md">
            <div className={`max-w-screen-xl flex ${isLoginPage ? 'justify-center' : 'justify-between'} items-center mx-auto p-4`}>
                <div className="flex items-center">
                    <img src="./logo-symbol.png" alt="" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-300 ml-2">Brand</span>
                </div>
                {!isLoginPage && (
                    <div className="flex items-center ml-auto space-x-6">
                        <Link href="/">
                            <button
                                className={`flex flex-col items-center text-gray-600 hover:text-blue-800 ${activeButton === 'produk' ? 'text-blue-800' : ''}`}
                                onClick={() => handleButtonClick('produk')}
                            >
                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5" />
                                </svg>
                                <span className="text-xs">Produk</span>
                            </button>
                        </Link>
                        <Link href="./cart">
                            <button
                                className={`flex flex-col items-center text-gray-600 hover:text-blue-800 ${activeButton === 'keranjang' ? 'text-blue-800' : ''}`}
                                onClick={() => handleButtonClick('keranjang')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                <span className="text-xs">Keranjang</span>
                            </button>
                        </Link>
                        <button
                            onClick={toggleDropdown}
                            type='button'
                            className={`flex flex-col items-center text-gray-600 hover:text-blue-800 ${activeButton === 'profile' ? 'text-blue-800' : ''}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs">Profile</span>
                        </button>
                        {isOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <Link href="./ChangeUser">
                                    <li>
                                        <p
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={closeDropdown}
                                        >
                                            Profile
                                        </p>
                                    </li>
                                    </Link>
                                    <li>
                                        {status === 'authenticated' ? (
                                            <button
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => signOut()}
                                            >
                                                LogOut
                                            </button>
                                        ) : (
                                            <button
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => router.push("/login")}
                                            >
                                                Login
                                            </button>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
