import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import mongoose from 'mongoose'
import { getServerSession } from 'next-auth'

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL)
  const data = await req.json()
  const session = await getServerSession(authOptions)
  console.log(session)

  if ('name' in data) {
    //update user name
  }

  return Response.json(true)
}
