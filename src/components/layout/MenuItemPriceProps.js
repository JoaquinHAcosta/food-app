import React from 'react'
import Plus from '../icons/plus'
import Trash from '@/components/icons/trash'

const MenuItemPriceProps = ({ name, addLabel, props, setProps }) => {
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
      <label>{name}</label>
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
                value={prop.value}
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
  )
}

export default MenuItemPriceProps
