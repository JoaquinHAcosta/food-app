'use client'
import { useProfile } from '@/components/UseProfile'
import UserForm from '@/components/layout/UserForm'
import UserTabs from '@/components/layout/UserTabs'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const EditUserPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const { loading, data } = useProfile()

  useEffect(() => {
    fetch('/api/users').then((res) => {
      res.json().then((users) => {
        const user = users.find((u) => u._id === id)
        setUser(user)
      })
    })
  }, [])

  const handleSaveButtonClick = (ev, data) => {
    ev.preventDefault()
    fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, _id: id }),
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
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  )
}

export default EditUserPage
