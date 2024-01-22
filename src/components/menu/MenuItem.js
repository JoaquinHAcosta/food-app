import React, { useContext, useState } from 'react'
import { CartContext } from '../AppContext'
import toast from 'react-hot-toast'
import MenuItemTile from './MenuItemTile'
import Image from 'next/image'
import FlyingButton from 'react-flying-item'

const MenuItem = (menuItem) => {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null)
  const [selectedExtras, setSelectedExtras] = useState([])
  const [showPopUp, setShowPopUp] = useState(false)
  const { addToCart } = useContext(CartContext)

  const handleAddToCartButtonClick = async () => {
    const hasOptions = (sizes.length > 0) | (extraIngredientPrices.length > 0)

    if (hasOptions && !showPopUp) {
      setShowPopUp(true)
      return
    }

    addToCart(menuItem, selectedSize, selectedExtras)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setShowPopUp(false)
    toast.success('Added to cart!', {
      position: 'top-right',
    })
  }

  const handleExtraThingClick = (ev, extraThing) => {
    const checked = ev.target.checked
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing])
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name)
      })
    }
  }

  let selectedPrice = basePrice

  if (selectedSize) {
    selectedPrice += selectedSize.price
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price
    }
  }

  return (
    <>
      {showPopUp && (
        <div
          onClick={() => setShowPopUp(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md "
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: 'calc(100vh - 100px)' }}
            >
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
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map((size) => (
                    <label
                      key={size.name}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        type="radio"
                        name="size"
                      />
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">
                    Pick an extra ingredient
                  </h3>
                  {extraIngredientPrices.map((extraThing) => (
                    <label
                      key={extraThing.name}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        onChange={(ev) => handleExtraThingClick(ev, extraThing)}
                        type="checkbox"
                        name={extraThing.name}
                      />
                      {extraThing.name} +${extraThing.price}
                    </label>
                  ))}
                </div>
              )}
              <FlyingButton targetTop={'5%'} targetLeft={'95%'} src={image}>
                <div
                  onClick={handleAddToCartButtonClick}
                  className="primary sticky bottom-2"
                >
                  Add to cart ${selectedPrice}
                </div>
              </FlyingButton>
              <button className="mt-2" onClick={() => setShowPopUp(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  )
}

export default MenuItem
