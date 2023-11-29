'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'

const ProfilePage = () => {
  const session = useSession()
  console.log(session)
  const { status } = session

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
      <form className="max-w-md mx-auto ">
        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg relative">
              <Image
                className="rounded-lg w-full h-full"
                src={userImage}
                width={250}
                height={250}
                alt={'avatar'}
              />
              <button type="button">Change Avatar</button>
            </div>
          </div>
          <div className="grow">
            <input type="text" placeholder="First and last name" />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default ProfilePage
