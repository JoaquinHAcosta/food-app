'use client'
import { SessionProvider } from 'next-auth/react'
import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({})

export function AppProvider({ children }) {
  const [cartProducts, setCarProducts] = useState([])

  const ls = typeof window !== 'undefined' ? window.localStorage : null

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCarProducts(JSON.parse(ls.getItem('cart')))
    }
  }, [])

  const saveCartProductsToLocalStorage = (cartProducts) => {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts))
    }
  }

  const addToCart = (product, size = null, extras = []) => {
    setCarProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras }
      const newProducts = [...prevProducts, cartProduct]
      saveCartProductsToLocalStorage(newProducts)
      return newProducts
    })
  }

  const cleanCart = () => {
    setCarProducts([])
    saveCartProductsToLocalStorage([])
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCarProducts,
          addToCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  )
}
