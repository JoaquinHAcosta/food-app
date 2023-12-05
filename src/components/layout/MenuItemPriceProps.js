import React, { useState } from 'react'
import Plus from '../icons/plus'
import Trash from '@/components/icons/trash'
import ChevronDown from '@/components/icons/chevronDown'
import ChevronUp from '@/components/icons/chevronUp'

const MenuItemPriceProps = ({ name, addLabel, props, setProps }) => {
  const [isOpen, setIsOpen] = useState(false)
  const addProps = () => {
    setProps((oldProps) => {
      return [...oldProps, { name: '', price: 0 }]
    })
  }

  const editProps = (ev, index, prop) => {
    const newValue = ev.target.value
    setProps((prevSizes) => {
      const newSizes = [...prevSizes]
      newSizes[index][prop] = newValue
      return newSizes
    })
  }

  const removeProps = (indexToRemove) => {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove))
  }
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex p-1 border-0 justify-start"
      >
        {isOpen ? <ChevronUp /> : <ChevronDown />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? 'block' : 'hidden'}>
        {props?.length > 0 &&
          props.map((prop, index) => (
            <div className="flex items-end gap-2" key={index}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={prop.name}
                  onChange={(ev) => editProps(ev, index, 'name')}
                />
              </div>
              <div>
                <label>Extra price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={prop.price}
                  onChange={(ev) => editProps(ev, index, 'price')}
                />
              </div>
              <div>
                <button
                  onClick={() => removeProps(index)}
                  type="button"
                  className="bg-white mb-2 px-2"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          onClick={addProps}
          type="button"
          className="bg-white items-center"
        >
          <Plus className="w-4 h-4" />
          {addLabel}
        </button>
      </div>
    </div>
  )
}

export default MenuItemPriceProps
