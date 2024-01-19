import Image from 'next/image'
import Trash from '@/components/icons/trash'
import { cartProductPrice } from '../AppContext'

const CartProduct = ({ product, onRemove }) => {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        <Image src={product.image} height={240} width={240} alt="" />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product.size && (
          <div className="text-sm">
            Size: <span className="uppercase">{product.size.name}</span>
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
      <div className="text-lg font-semibold">${cartProductPrice(product)}</div>
      <div className="ml-2">
        <button type="button" onClick={() => onRemove(index)} className="p-2">
          <Trash />
        </button>
      </div>
    </div>
  )
}

export default CartProduct
