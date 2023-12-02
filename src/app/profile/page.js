'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'
import UserTabs from '@/components/layout/UserTabs'
import EditableImage from '@/components/layout/EditableImage'

const ProfilePage = () => {
  const session = useSession()

  const [userName, setUserName] = useState('')
  const [image, setImage] = useState('')
  const [phone, setPhone] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [isAdmin, setIsAdmin] = useState('')
  const [profileFetch, setProfileFetch] = useState(false)
  const { status } = session

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session?.data?.user?.name)
      setImage(session?.data?.user?.image)
      fetch('/api/profile').then((response) => {
        response.json().then((data) => {
          setPhone(data.phone)
          setStreetAddress(data.streetAddress)
          setPostalCode(data.postalCode)
          setCity(data.city)
          setCountry(data.country)
          setIsAdmin(data.admin)
          setProfileFetch(true)
        })
      })
    }
  }, [session, status])

  const handleProfileInfoUpdate = async (ev) => {
    ev.preventDefault()
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName,
          image,
          streetAddress,
          phone,
          postalCode,
          city,
          country,
        }),
      })
      if (response.ok) resolve()
      else reject()
    })

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: 'Error',
    })
  }

  if (status === 'loading' || !profileFetch) {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-md mx-auto mt-4">
        <div className="flex gap-4">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
              <EditableImage link={image} setLink={setImage} />
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
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
              value={session.data.user.email}
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
            <div className="flex gap-2">
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
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
