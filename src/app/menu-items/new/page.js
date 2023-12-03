'use client'
import React, { useState } from 'react'
import { useProfile } from '@/components/UseProfile'
import UserTabs from '@/components/layout/UserTabs'

import toast from 'react-hot-toast'
import Link from 'next/link'
import Left from '@/components/icons/left'
import { redirect } from 'next/navigation'
import MenuItemForm from '@/components/layout/MenuItemForm'

const NewMenuItemPage = () => {
  const [redirecToItems, setRedirectToItems] = useState(false)
  const { loading, data } = useProfile()

  const handleFormSubmit = (ev, data) => {
    ev.preventDefault()

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'POST',
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
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  )
}

export default NewMenuItemPage
