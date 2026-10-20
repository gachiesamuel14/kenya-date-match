'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email for confirmation!')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-red-500">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">Join KenyaDate</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded-lg"
          required
          minLength={6}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white p-3 rounded-lg font-bold hover:bg-pink-700 disabled:opacity-50"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-pink-600">Login</a>
        </p>
      </form>
    </div>
  )
}