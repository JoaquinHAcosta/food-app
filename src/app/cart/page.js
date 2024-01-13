'use client'

import { CartContext, cartProductPrice } from '@/components/AppContext'
import { useProfile } from '@/components/UseProfile'
import Trash from '@/components/icons/trash'
import AddressInputs from '@/components/layout/AddressInputs'
import SectionHeaders from '@/components/layout/SectionHeaders'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'

const CartPage = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext)

  const [address, setAddress] = useState({})
  const { data: profileData } = useProfile()

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
          <div className="py-2 text-right pr-16">
            <span className="text-gray-500">Subtotal:</span>
            <span className="text-lg font-semibold pl-2">${subTotal}</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay ${subTotal}</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CartPage
