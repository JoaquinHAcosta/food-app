'use client'
import { useEffect, useState } from 'react'
import { useProfile } from '@/components/UseProfile'
import UserTabs from '@/components/layout/UserTabs'
import MenuItemForm from '@/components/layout/MenuItemForm'

import toast from 'react-hot-toast'
import Link from 'next/link'
import Left from '@/components/icons/left'
import { redirect, useParams } from 'next/navigation'

const EditMenuPage = () => {
  const { id } = useParams()

  const [menuItem, setMenuItem] = useState(null)
  const [redirecToItems, setRedirectToItems] = useState(false)
  const { loading, data } = useProfile()

  useEffect(() => {
    fetch('/api/menu-items').then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id)
        setMenuItem(item)
      })
    })
  }, [])

  const handleFormSubmit = (ev, data) => {
    ev.preventDefault()
    data = {
      ...data,
      _id: id,
    }

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        resolve()
      } else {
        reject()
      }
      await toast.promise(savingPromise, {
        loading: 'Saving this tasty item',
        success: 'Saved',
        error: 'Error!',
      })
    })

    setRedirectToItems(true)
  }

  if (redirecToItems) {
    return redirect('/menu-items')
  }

  if (loading) {
    return 'Loading user info...'
  }

  if (!data.admin) {
    return 'Not an admin'
  }
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link href={'/menu-items'} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
    </section>
  )
}

export default EditMenuPage
