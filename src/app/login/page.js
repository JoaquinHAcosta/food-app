'use client'
import Image from 'next/image'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginInProgress, setLoginInProgress] = useState(false)

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    setLoginInProgress(true)

    await signIn('credentials', { email, password })

    setLoginInProgress(false)
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit">Login</button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          className="flex gap-4 justify-center"
          disabled={loginInProgress}
        >
          <Image src={'/google.png'} alt="logo google" width={24} height={24} />
          Login with google
        </button>
      </form>
    </section>
  )
}

export default LoginPage
