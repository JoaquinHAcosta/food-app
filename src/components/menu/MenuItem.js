import React, { useContext, useState } from 'react'
import { CartContext } from '../AppContext'
import toast from 'react-hot-toast'
import MenuItemTile from './MenuItemTile'
import Image from 'next/image'

const MenuItem = (menuItem) => {
  const [showPopUp, setShowPopUp] = useState(false)
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem
  const { addToCart } = useContext(CartContext)

  const handleAddToCartButtonClick = () => {
    if ((sizes.length === 0) & (extraIngredientPrices.length === 0)) {
      addToCart(menuItem)
      toast.success('Added to cart!')
    } else {
      setShowPopUp(true)
    }
  }

  return (
    <>
      {showPopUp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-md">
            <Image
              src={image}
              alt={`${name}`}
              width={300}
              height={200}
              className="mx-auto"
            />
            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
            <p className="text-center text-gray-500 text-sm mb-2">
              {description}
            </p>
            {sizes?.length > 0 && (
              <div className="p-2">
                <h3 className="text-center text-gray-700">Pick your size</h3>
                {sizes.map((size) => (
                  <label
                    key={size.name}
                    className="flex items-center gap-2 p-4 border rounded-md mb-1"
                  >
                    <input type="radio" name="size" />
                    {size.name} ${basePrice + size.price}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  )
}

export default MenuItem
