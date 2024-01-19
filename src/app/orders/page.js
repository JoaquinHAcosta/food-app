'use client'

import { useProfile } from '@/components/UseProfile'
import SectionHeaders from '@/components/layout/SectionHeaders'
import UserTabs from '@/components/layout/UserTabs'
import { useEffect, useState } from 'react'

const OrderPage = () => {
  const [orders, setOrders] = useState([])
  const { loading, data: profile } = useProfile()

  useEffect(() => {
    fetch('/api/orders').then((res) => {
      res.json().then((orders) => {
        console.log(orders)
        setOrders(orders)
      })
    })
  }, [])

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {orders?.length > 0 &&
          orders.map((order, index) => (
            <div key={index} className="bg-gray-200 mb-2 p-4 rounded-lg">
              {order.createdAt}
            </div>
          ))}
      </div>
    </section>
  )
}

export default OrderPage
