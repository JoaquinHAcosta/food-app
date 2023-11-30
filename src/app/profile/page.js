'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const session = useSession()

  const [userName, setUserName] = useState('')
  const [image, setImage] = useState('')
  const [phone, setPhone] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const { status } = session

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session?.data?.user?.name)
      setImage(session?.data?.user?.image)
    }
  }, [session, status])

  const handleProfileInfoUpdate = async (ev) => {
    ev.preventDefault()
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, image }),
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

  const handleFileChange = async (ev) => {
    const files = ev.target.files

    if (files?.length === 1) {
      const data = new FormData()
      data.set('file', files[0])

      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setImage(link)
          })
        }
        throw new Error('Something went wrong')
      })

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Upload complete',
        error: 'Upload error',
      })
    }
  }

  if (status === 'loading') {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto ">
        <div className="flex gap-4">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
              {image && (
                <Image
                  className="rounded-lg w-full h-full mb-1"
                  src={image}
                  width={250}
                  height={250}
                  alt={'avatar'}
                />
              )}
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                  Edit
                </span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
              placeholder="First and last name"
            />
            <input
              type="email"
              value={session.data.user.email}
              disabled={true}
            />
            <input
              type="tel"
              onChange={(ev) => setUserName(ev.target.value)}
              placeholder="Phone number"
              value={phone}
            />
            <input
              type="text"
              onChange={(ev) => setUserName(ev.target.value)}
              placeholder="Street address"
              value={streetAddress}
            />
            <div className="flex gap-4">
              <input
                type="text"
                onChange={(ev) => setUserName(ev.target.value)}
                placeholder="City"
                value={city}
              />
              <input
                type="text"
                onChange={(ev) => setUserName(ev.target.value)}
                placeholder="Postal code"
                value={postalCode}
              />
            </div>
            <input
              type="text"
              onChange={(ev) => setUserName(ev.target.value)}
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
