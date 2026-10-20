'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      router.push('/discover')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-red-500">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">Login to KenyaDate</h2>
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded-lg"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white p-3 rounded-lg font-bold hover:bg-pink-700 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
        <p className="mt-4 text-center">
          No account? <a href="/signup" className="text-pink-600">Sign up</a>
        </p>
      </form>
    </div>
  )
}