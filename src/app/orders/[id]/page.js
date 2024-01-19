'use client'

import { CartContext } from '@/components/AppContext'
import AddressInputs from '@/components/layout/AddressInputs'
import SectionHeaders from '@/components/layout/SectionHeaders'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

const OrderPage = () => {
  const { cleanCart } = useContext(CartContext)
  const [order, setOrder] = useState()
  const { id } = useParams()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('clear-cart=1')) {
        cleanCart()
      }
    }

    if (id) {
      fetch('/api/orders?_id' + id).then((res) => {
        res.json().then((orderData) => {
          //por alguna razon aca trae un array, solucion temporal
          setOrder(orderData[0])
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
      {order && (
        <div className="grid grid-cols-2 gap-16">
          <div>left side - products</div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <AddressInputs disabled={true} addressProps={order} />
          </div>
        </div>
      )}
    </section>
  )
}

export default OrderPage
