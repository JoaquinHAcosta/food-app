'use client'

import { CartContext } from '@/components/AppContext'
import SectionHeaders from '@/components/layout/SectionHeaders'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

const OrderPage = () => {
  const { clearCart } = useContext(CartContext)
  const [order, setOrder] = useState()
  const { id } = useParams()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart()
      }
    }

    if (id) {
      fetch('/api/orders?_id' + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData)
        })
      })
    }
  }, [])

  return (
    <section className="max-w-2xl mx-auto text-center mt-8">
      <SectionHeaders mainHeader="Your order" />
      <div className="my-4">
        <p>Thanks for your order</p>
        <p>We will call you when your order will be on the way.</p>
      </div>
    </section>
  )
}

export default OrderPage
