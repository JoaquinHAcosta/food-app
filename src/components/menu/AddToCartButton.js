import FlyingButton from 'react-flying-item'

const AddToCartButton = ({ hasSizesOrExtras, onCLick, basePrice, image }) => {
  if (!hasSizesOrExtras) {
    return (
      <div onClick={onCLick} className="flying-button-parent mt-4">
        <FlyingButton targetTop={'5%'} targetLeft={'95%'} src={image}>
          Add to cart ${basePrice}
        </FlyingButton>
      </div>
    )
  }
  return (
    <button
      type="button"
      onClick={onCLick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
      <span>Add to cart (from ${basePrice})</span>
    </button>
  )
}

export default AddToCartButton
