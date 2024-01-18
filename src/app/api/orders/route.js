import { authOptions } from '@/app/api/auth/[...nextAuth]/route'
import mongoose from 'mongoose'
import { getServerSession } from 'next-auth'
import { UserInfo } from '@/models/UserInfo'
import { Order } from '@/models/Order'

export async function GET() {
  mongoose.connect(process.env.MONGO_URL)

  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email

  let isAdmin = false

  if (userEmail) {
    const userInfo = await UserInfo.findOne({ email: userEmail })
    if (userInfo) {
      isAdmin = userInfo.admin
    }
  }

  if (isAdmin) {
    return Response.json(await Order.find())
  }

  if (userEmail) {
    return Response.json(await Order.find({ userEmail }))
  }
}
