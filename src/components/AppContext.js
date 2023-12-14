'use client'
import { SessionProvider } from 'next-auth/react'
import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({})

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([])

  const ls = typeof window !== 'undefined' ? window.localStorage : null

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')))
    }
  }, [])

  const saveCartProductsToLocalStorage = (cartProducts) => {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts))
    }
  }

  const addToCart = (product, size = null, extras = []) => {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras }
      const newProducts = [...prevProducts, cartProduct]
      saveCartProductsToLocalStorage(newProducts)
      return newProducts
    })
  }

  const cleanCart = () => {
    setCartProducts([])
    saveCartProductsToLocalStorage([])
  }

  const removeCartProduct = (indexToRemove) => {
    setCartProducts((prevCartProducst) => {
      const newCartProducts = prevCartProducst.filter(
        (v, index) => index !== indexToRemove
      )
      saveCartProductsToLocalStorage(newCartProducts)
      return newCartProducts
    })
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProduct,
          cleanCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  )
}
