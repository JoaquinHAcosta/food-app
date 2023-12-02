'use client'
import UserTabs from '@/components/layout/UserTabs'
import React, { useEffect, useState } from 'react'

const CategoriesPage = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    fetch('/api/profile').then((response) => {
      response.json().then((data) => {
        setIsAdmin(data.admin)
      })
    })
  }, [])

  if (!isAdmin) {
    return 'Not and admin'
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      categories
    </section>
  )
}

export default CategoriesPage
