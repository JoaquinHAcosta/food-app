'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'

const ProfilePage = () => {
  const session = useSession()

  const [userName, setUserName] = useState('')
  const [image, setImage] = useState('')
  const [saved, setSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { status } = session

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session?.data?.user?.name)
      setImage(session?.data?.user?.image)
    }
  }, [session, status])

  const handleProfileInfoUpdate = async (ev) => {
    ev.preventDefault()
    setSaved(false)
    setIsSaving(true)
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, image }),
    })
    setIsSaving(false)
    if (response.ok) {
      setSaved(true)
    }
  }

  const handleFileChange = async (ev) => {
    const files = ev.target.files

    if (files?.length === 1) {
      const data = new FormData()
      data.set('file', files[0])
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      })
      const link = await response.json()
      setImage(link)
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
        {saved && (
          <h2 className="text-center bg-green-200 p-4 rounded-lg border border-green-300">
            Profile saved!
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center bg-blue-200 p-4 rounded-lg border border-blue-300">
            Saving...
          </h2>
        )}
        <div className="flex gap-4 items-center">
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
              placeholder="First and last name"
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
