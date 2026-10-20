'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Discover() {
  const [user, setUser] = useState<any>(null)
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/login')
      setUser(user)

      // Request location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
            // TODO: Save to profiles table
          },
          (err) => console.error(err)
        )
      }
    }
    init()
  }, [router, supabase])

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-6">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">Discover Matches Near You</h1>
      {location ? (
        <p className="text-center mb-4">Your location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
      ) : (
        <p className="text-center">Requesting location permission...</p>
      )}
      <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-xl p-6 text-center">
        <div className="h-64 bg-gray-200 rounded-2xl mb-4 flex items-center justify-center">
          <span className="text-gray-500">Profile Photo / Swipe Card</span>
        </div>
        <h2 className="text-2xl font-bold">Sample Profile</h2>
        <p className="text-gray-600">Age 25 • Nairobi • Interests: Music, Travel</p>
        <div className="flex justify-center gap-6 mt-6">
          <button className="bg-red-500 text-white rounded-full w-16 h-16 text-2xl">✕</button>
          <button className="bg-green-500 text-white rounded-full w-16 h-16 text-2xl">♥</button>
        </div>
      </div>
      <p className="text-center mt-8 text-sm text-gray-500">Full matching algorithm, filters (tribe, religion, distance), real-time chat, and photo uploads coming soon. See README for setup.</p>
    </div>
  )
}