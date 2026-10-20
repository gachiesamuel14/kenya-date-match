import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white">
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">KenyaDate</h1>
        <div className="space-x-4">
          <Link href="/login" className="px-4 py-2 bg-white text-pink-600 rounded-full font-semibold hover:bg-gray-100">
            Login
          </Link>
          <Link href="/signup" className="px-4 py-2 bg-transparent border-2 border-white rounded-full font-semibold hover:bg-white hover:text-pink-600">
            Sign Up
          </Link>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">Find Love Nearby in Kenya</h2>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl">
          Location-based matchmaking for Kenyans. Connect with people in your county, town, or neighborhood. Swipe, match, and chat securely.
        </p>
        <Link href="/signup" className="px-8 py-4 bg-white text-pink-600 text-xl font-bold rounded-full hover:scale-105 transition">
          Start Matching Now
        </Link>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="bg-white/20 backdrop-blur p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-2">📍 Location Matching</h3>
            <p>Find people near you in Nairobi, Mombasa, Kisumu, and more.</p>
          </div>
          <div className="bg-white/20 backdrop-blur p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-2">🇰🇪 Local Vibes</h3>
            <p>Filters for tribe, religion, lifestyle, and Sheng-friendly chats.</p>
          </div>
          <div className="bg-white/20 backdrop-blur p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-2">🔒 Safe & Secure</h3>
            <p>Report system, verified profiles, and privacy first.</p>
          </div>
        </div>
      </main>
    </div>
  );
}