'use client'
import { useEffect, useState } from 'react'
import { useProfile } from '@/components/UseProfile'
import UserTabs from '@/components/layout/UserTabs'
import EditableImage from '@/components/layout/EditableImage'

import toast from 'react-hot-toast'
import Link from 'next/link'
import Left from '@/components/icons/left'
import { redirect, useParams } from 'next/navigation'

const EditMenuPage = () => {
  const { id } = useParams()
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [redirecToItems, setRedirectToItems] = useState(false)
  const { loading, data } = useProfile()

  useEffect(() => {
    fetch('/api/menu-items').then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id)
        setImage(item.image)
        setName(item.name)
        setDescription(item.description)
        setBasePrice(item.basePrice)
      })
    })
  }, [])

  const handleFormSubmit = (ev) => {
    ev.preventDefault()
    const data = {
      image,
      name,
      description,
      basePrice,
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
      <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
        <div
          className="grid items-start gap-4"
          style={{ gridTemplateColumns: '.3fr .7fr' }}
        >
          <div>
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label>Item name</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            <label>Base Price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(ev) => setBasePrice(ev.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default EditMenuPage
