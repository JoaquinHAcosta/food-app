'use client'

import { CartContext, cartProductPrice } from '@/components/AppContext'
import Trash from '@/components/icons/trash'
import SectionHeaders from '@/components/layout/SectionHeaders'
import Image from 'next/image'
import { useContext } from 'react'

const CartPage = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext)

  let total = 0
  for (const p of cartProducts) {
    total += cartProductPrice(p)
  }
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-4 grid gap-4 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products on your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center gap-4 mb-2 border-b py-2"
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
          <div className="py-4 text-right pr-16">
            <span className="text-gray-500">Subtotal:</span>
            <span className="text-lg font-semibold pl-2">${total}</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <label>Address</label>
            <input type="text" placeholder="Street address" />
            <button type="submit">Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CartPage
