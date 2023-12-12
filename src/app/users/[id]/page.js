'use client'
import { useProfile } from '@/components/UseProfile'
import UserForm from '@/components/layout/UserForm'
import UserTabs from '@/components/layout/UserTabs'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const EditUserPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const { loading, data } = useProfile()

  useEffect(() => {
    fetch('/api/profile?_id=' + id).then((res) => {
      res.json().then((user) => {
        setUser(user)
        console.log(user)
      })
    })
  }, [])

  const handleSaveButtonClick = async (ev, data) => {
    ev.preventDefault()

    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _id: id }),
      })
      if (res.ok) {
        resolve()
      } else {
        reject()
      }
    })

    await toast.promise(promise, {
      loading: 'Saving user...',
      success: 'User saved',
      error: 'Something went wrong',
    })
  }

  if (loading) {
    return 'Loading user info...'
  }

  if (!data.admin) {
    return 'Not an admin'
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8 p-2">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  )
}

export default EditUserPage
