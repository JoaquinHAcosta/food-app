'use client'
import { SessionProvider } from 'next-auth/react'
import { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const CartContext = createContext({})

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice
  if (cartProduct.size) {
    price += cartProduct.size.price
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price
    }
  }
  return price
}

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
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (v, index) => index !== indexToRemove
      )
      saveCartProductsToLocalStorage(newCartProducts)
      return newCartProducts
    })
    toast.success('Product Removed')
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
