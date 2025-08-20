
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Hero(){
  return (
    <section className="relative text-white py-24 px-6 text-center overflow-hidden min-h-[72vh] flex items-center">
      {/* background image */}
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=60"
        alt="People collaborating and funding ideas"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700/60 via-indigo-700/55 to-blue-700/60" />
      {/* soft glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-pink-400/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-white text-sm mb-4">
            <Sparkles className="w-4 h-4" /> Empower Ideas through Crowdfunding
          </div>
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Empower Ideas through <span className="text-yellow-300">Crowdfunding</span>
          </h1>
          <p className="text-lg mb-8 opacity-95">Launch campaigns, support bold projects, and track progress in real-time. Transparent. Simple. Impactful.</p>
          <div className="flex justify-center gap-4">
            <Link to="/create" className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition duration-300">🚀 Start a Campaign</Link>
            <Link to="/campaigns" className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300">💝 Explore Campaigns</Link>
          </div>
          <div className="mt-5 text-xs opacity-80 flex justify-center gap-4">
            <span>⚡ Secure</span>
            <span>🌍 Global Reach</span>
            <span>📈 Live Tracking</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
