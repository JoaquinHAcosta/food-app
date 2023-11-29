'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'

const ProfilePage = () => {
  const session = useSession()

  const [userName, setUserName] = useState('')
  const { status } = session

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session?.data?.user?.name)
    }
  }, [session, status])
  const handleProfileInfoUpdate = async (ev) => {
    ev.preventDefault()
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: userName }),
    })
  }

  if (status === 'loading') {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  const userImage = session.data.user.image

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto ">
        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg relative">
              <Image
                className="rounded-lg w-full h-full mb-1"
                src={userImage}
                width={250}
                height={250}
                alt={'avatar'}
              />
              <button type="button">Edit</button>
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
