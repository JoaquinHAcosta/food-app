'use client'

import EditableImage from '@/components/layout/EditableImage'
import { useState } from 'react'
import { useProfile } from '@/components/UseProfile'

const UserForm = ({ user, onSave }) => {
  const [userName, setUserName] = useState(user?.name || '')
  const [image, setImage] = useState(user?.image || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '')
  const [postalCode, setPostalCode] = useState(user?.postalCode || '')
  const [city, setCity] = useState(user?.city || '')
  const [country, setCountry] = useState(user?.country || '')
  const [admin, setAdmin] = useState(user?.admin || false)

  const { data: loggedInUserData } = useProfile()

  return (
    <div className="flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            streetAddress,
            city,
            country,
            postalCode,
            admin,
          })
        }
      >
        <label>First and last name</label>
        <input
          type="text"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
          placeholder="First and last name"
        />
        <label>Email</label>
        <input
          placeholder={'Email'}
          type="email"
          value={user.email}
          disabled={true}
        />
        <label>Phone</label>
        <input
          type="tel"
          onChange={(ev) => setPhone(ev.target.value)}
          placeholder="Phone number"
          value={phone}
        />
        <label>Street Address</label>
        <input
          type="text"
          onChange={(ev) => setStreetAddress(ev.target.value)}
          placeholder="Street address"
          value={streetAddress}
        />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label>City</label>
            <input
              type="text"
              onChange={(ev) => setCity(ev.target.value)}
              placeholder="City"
              value={city}
            />
          </div>
          <div>
            <label>Postal Code</label>
            <input
              type="text"
              onChange={(ev) => setPostalCode(ev.target.value)}
              placeholder="Postal code"
              value={postalCode}
            />
          </div>
        </div>
        <label>Country</label>
        <input
          type="text"
          onChange={(ev) => setCountry(ev.target.value)}
          placeholder="Country"
          value={country}
        />
        {loggedInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 block mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                value={'1'}
                checked={admin}
                onClick={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default UserForm
