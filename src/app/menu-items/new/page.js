import { useProfile } from '@/components/UseProfile'

const NewMenuItemPage = () => {
  const { loading, data } = useProfile()

  if (loading) {
    return 'Loading user info...'
  }

  if (!data.admin) {
    return 'Not an admin'
  }
  return <div>page</div>
}

export default NewMenuItemPage
