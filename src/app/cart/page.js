'use client'

import { CartContext, cartProductPrice } from '@/components/AppContext'
import { useProfile } from '@/components/UseProfile'
import Trash from '@/components/icons/trash'
import AddressInputs from '@/components/layout/AddressInputs'
import SectionHeaders from '@/components/layout/SectionHeaders'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const CartPage = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext)

  const [address, setAddress] = useState({
    phone: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: '',
  })
  const { data: profileData } = useProfile()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.url.includes('canceled=1')) {
        toast.error('Payment failed')
      }
    }
  }, [])

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      }
      setAddress(addressFromProfile)
    }
  }, [profileData])

  let subTotal = 0
  for (const p of cartProducts) {
    subTotal += cartProductPrice(p)
  }

  const handleAddressChange = (propName, value) => {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }))
  }

  const proceedToCheckout = async (ev) => {
    ev.preventDefault()
    // address and shopping cart products

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve()
          const link = await response.json()
          window.location = link
        } else {
          reject()
        }
      })
    })

    toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment',
      error: 'Somehing went wrong... Pleaste try again later.',
    })
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products on your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b py-4"
              >
                <div className="w-24">
                  <Image src={product.image} height={240} width={240} alt="" />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm">
                      Size:{' '}
                      <span className="uppercase">{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div>
                      {product.extras.map((extra, i) => (
                        <div className="text-sm text-gray-500" key={i}>
                          Extra {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={() => removeCartProduct(index)}
                    className="p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal: <br />
              Delivery: <br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ${subTotal}
              <br />
              $5
              <br />${subTotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay ${subTotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CartPage
