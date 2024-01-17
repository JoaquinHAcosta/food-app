import SectionHeaders from '@/components/layout/SectionHeaders'
import React from 'react'

const OrderPage = () => {
  return (
    <section className="max-w-2xl mx-auto text-center mt-8">
      <SectionHeaders mainHeader="Your order" />
      <div className="my-4">
        <p>Thanks for your order</p>
        <p>We will call you when your order will be on the way</p>
      </div>
    </section>
  )
}

export default OrderPage
