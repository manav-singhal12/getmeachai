"use client"
import {React,useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { useEffect } from "react"
const Navbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false);
//  console.log(setshowdropdown)
  return (
    <div>
      <nav className="bg-gray-900 text-white top-0 fixed w-full ">
        <div className="container mx-auto flex justify-between items-center p-4 md:h-16">
          <div className="text-xl font-bold">
            <Link href="/">GetMeAchai</Link>
          </div>
          <ul className="hidden md:flex gap-6 items-center">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            {session ? (
              <>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Welcome, {session.user.email}
                  <svg className="w-2.5 h-2.5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <div
                  id="dropdown"
                  className={`z-10 ${showDropdown ? "block" : "hidden"} absolute top-14 right-4 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-blue-600`}
                >
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 w-56" aria-labelledby="dropdownDefaultButton">
                    <li>
                      <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-800 dark:hover:text-white">Dashboard</Link>
                    </li>
                    <li>
                      <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-800 dark:hover:text-white">Your Page</Link>
                    </li>
                    
                    <li>
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-800 dark:hover:text-white"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Link href="/login">
                <button
                  type="button"
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Login
                </button>
              </Link>
            )}
          </ul>
          <div className="md:hidden">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        {showDropdown && (
          <div className="md:hidden">
            <ul className="flex flex-col items-center gap-4 p-4">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              {session ? (
                <>
                  <li><Link href="/dashboard">Dashboard</Link></li>
                  <li><Link href={`/${session.user.name}`}>Your Page</Link></li>
                  <li><Link href="#">Earnings</Link></li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="text-white"
                    >
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/login">
                    <button
                      type="button"
                      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Login
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
