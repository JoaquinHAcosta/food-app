'use client'

import { CartContext, cartProductPrice } from '@/components/AppContext'
import AddressInputs from '@/components/layout/AddressInputs'
import SectionHeaders from '@/components/layout/SectionHeaders'
import CartProduct from '@/components/menu/CartProduct'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

const OrderPage = () => {
  const { cleanCart } = useContext(CartContext)
  const [order, setOrder] = useState()
  const [loadingOrders, setLoadingOrders] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('clear-cart=1')) {
        cleanCart()
      }
    }

    if (id) {
      setLoadingOrders(true)
      fetch('/api/orders?_id' + id).then((res) => {
        res.json().then((orderData) => {
          //por alguna razon aca trae un array, solucion temporal
          setOrder(orderData[0])
          setLoadingOrders(false)
        })
      })
    }
  }, [])

  let subtotal = 0
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product)
    }
  }

  return (
    <section className="max-w-2xl mx-auto text-center mt-8">
      <SectionHeaders mainHeader="Your order" />
      <div className="mt-4 mb-8">
        <p>Thanks for your order</p>
        <p>We will call you when your order will be on the way.</p>
      </div>
      {loadingOrders && <div>Loading order...</div>}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product, i) => (
              <CartProduct key={i} product={product} />
            ))}
            <div className="text-right text-gray-500">
              Subtotal:{' '}
              <span className="text-black font-bold inline-block w-8">
                ${subtotal}
              </span>
            </div>
            <div className="text-right text-gray-500">
              Delivert:{' '}
              <span className="text-black font-bold inline-block w-8">$5</span>
            </div>
            <div className="text-right text-gray-500">
              Total:{' '}
              <span className="text-black font-bold inline-block w-8">
                ${subtotal + 5}
              </span>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <AddressInputs disabled={true} addressProps={order} />
          </div>
        </div>
      )}
    </section>
  )
}

export default OrderPage
