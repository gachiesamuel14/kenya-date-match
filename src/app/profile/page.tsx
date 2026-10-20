'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const [bio, setBio] = useState('')
  const [age, setAge] = useState('')
  const [county, setCounty] = useState('Nairobi')
  const [interests, setInterests] = useState('')
  const [message, setMessage] = useState('')
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/login')
    }
    checkUser()
  }, [router, supabase])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      bio,
      age: parseInt(age),
      county,
      interests: interests.split(',').map(i => i.trim()),
      updated_at: new Date().toISOString()
    })

    if (error) setMessage(error.message)
    else {
      setMessage('Profile saved! Now set your location.')
      router.push('/discover')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow">
        <h2 className="text-3xl font-bold mb-6 text-pink-600">Set Up Your Profile</h2>
        <form onSubmit={handleSave}>
          <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} className="w-full p-3 mb-4 border rounded" required min={18} />
          <select value={county} onChange={e => setCounty(e.target.value)} className="w-full p-3 mb-4 border rounded">
            <option>Nairobi</option>
            <option>Mombasa</option>
            <option>Kisumu</option>
            <option>Nakuru</option>
            <option>Kiambu</option>
            <option>Eldoret</option>
            <option>Other</option>
          </select>
          <textarea placeholder="Bio" value={bio} onChange={e => setBio(e.target.value)} className="w-full p-3 mb-4 border rounded" rows={4} />
          <input placeholder="Interests (comma separated)" value={interests} onChange={e => setInterests(e.target.value)} className="w-full p-3 mb-6 border rounded" />
          <button type="submit" className="w-full bg-pink-600 text-white p-3 rounded font-bold">Save Profile</button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </form>
      </div>
    </div>
  )
}