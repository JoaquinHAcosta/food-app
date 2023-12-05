'use client'
import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/UseProfile'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState([])
  const [editedCategory, setEditedCategory] = useState(null)
  const { loading: profileLoading, data: profileData } = useProfile()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => {
        setCategories(categories)
      })
    })
  }

  const handleCategorySubmit = async (ev) => {
    ev.preventDefault()
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName }
      if (editedCategory) {
        data._id = editedCategory._id
      }

      const response = await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setEditedCategory(null)
      setCategoryName('')
      fetchCategories()
      if (response.ok) {
        resolve()
      } else {
        reject()
      }
    })

    await toast.promise(creationPromise, {
      loading: editedCategory
        ? 'Updating category...'
        : 'Creating your new category...',
      success: editedCategory ? 'Category updated!' : 'Category created!',
      error: 'Error, sorry...',
    })
  }

  const handleDeleteClick = async (_id) => {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/categories?_id=' + _id, {
        method: 'DELETE',
      })
      if (response.ok) {
        resolve()
      } else {
        reject()
      }
    })

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    })
    fetchCategories()
  }

  if (profileLoading) {
    return 'Loading user info...'
  }

  if (!profileData.admin) {
    return 'Not an admin'
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? 'Update ' : 'New '}category name
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories:</h2>
        {categories?.length > 0 &&
          categories.map((c, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1"
            >
              <div className="grow">{c.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c)
                    setCategoryName(c.name)
                  }}
                >
                  Edit
                </button>
                <button type="button" onClick={() => handleDeleteClick(c._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}

export default CategoriesPage
