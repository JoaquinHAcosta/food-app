import React from 'react'

const AddressInputs = ({ addressProps, setAddressProps }) => {
  const { phone, streetAddress, postalCode, city, country } = addressProps
  return (
    <>
      <label>Phone</label>
      <input
        type="tel"
        onChange={(ev) => setAddressProps('phone', ev.target.value)}
        placeholder="Phone number"
        value={phone}
      />
      <label>Street Address</label>
      <input
        type="text"
        onChange={(ev) => setAddressProps('streetAddress', ev.target.value)}
        placeholder="Street address"
        value={streetAddress}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>City</label>
          <input
            type="text"
            onChange={(ev) => setAddressProps('city', ev.target.value)}
            placeholder="City"
            value={city}
          />
        </div>
        <div>
          <label>Postal Code</label>
          <input
            type="text"
            onChange={(ev) => setAddressProps('postalCode', ev.target.value)}
            placeholder="Postal code"
            value={postalCode}
          />
        </div>
      </div>
      <label>Country</label>
      <input
        type="text"
        onChange={(ev) => setAddressProps('country', ev.target.value)}
        placeholder="Country"
        value={country}
      />
    </>
  )
}

export default AddressInputs
