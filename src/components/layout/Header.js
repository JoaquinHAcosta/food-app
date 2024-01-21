'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { CartContext } from '../AppContext'
import ShoppingCart from '../icons/shoppingCart'
import Bars2 from '@/components/icons/bars2'

function AuthLinks({ status, userName }) {
  if (status === 'authenticated') {
    return (
      <>
        <Link className="whitespace-nowrap font-semibold" href={'/profile'}>
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'}>Login</Link>
        <Link
          href={'/register'}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Register
        </Link>
      </>
    )
  }
}

const Header = () => {
  const session = useSession()
  const status = session.status

  const userData = session.data?.user
  let userName = userData?.name || userData?.email

  const { cartProducts } = useContext(CartContext)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0]
  }

  return (
    <header>
      <div className="flex md:hidden items-center justify-between">
        <Link className="text-primary font-semibold text-2xl" href={'/'}>
          ST PIZZA
        </Link>
        <div className="flex gap-8 items-center">
          <Link className="relative" href={'/cart'}>
            <ShoppingCart />
            {cartProducts.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
          onClick={() => setMobileNavOpen(false)}
        >
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500">
          <AuthLinks status={status} userName={userName} />
          <Link className="relative" href={'/cart'}>
            <ShoppingCart />
            {cartProducts.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
