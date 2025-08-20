import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-toastify'
import api from '../api/api'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const backgrounds = [
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2000&auto=format&fit=crop'
  ]
  const bgUrl = useMemo(() => backgrounds[Math.floor(Math.random()*backgrounds.length)], [])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const { data } = await api.post('/api/auth/register', { name: (name||'').trim(), email: (email||'').trim().toLowerCase(), password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      toast.success('Account created! Welcome ✨')
      navigate('/')
    }catch(err){
      toast.error('Failed to register')
      console.error(err)
    }finally{
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* background image */}
      <img
        src={bgUrl}
        alt="Abstract creative background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* gradient overlay and glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-indigo-800/50 to-blue-900/60" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative z-10 w-full max-w-sm bg-white/95 backdrop-blur shadow-xl rounded-2xl p-6 space-y-4"
      >
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs">
            <Sparkles className="w-4 h-4" /> Join CrowdFund
          </div>
          <h2 className="mt-2 text-2xl font-extrabold">Create account</h2>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <User className="w-4 h-4" />
            </div>
            <input placeholder="Name" className="w-full border pl-9 pr-3 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Mail className="w-4 h-4" />
            </div>
            <input type="email" placeholder="Email" className="w-full border pl-9 pr-3 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Lock className="w-4 h-4" />
            </div>
            <input type={show ? 'text' : 'password'} placeholder="Password" className="w-full border pl-9 pr-10 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" value={password} onChange={e=>setPassword(e.target.value)} required />
            <button type="button" onClick={()=>setShow(!show)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full bg-gradient-to-r from-brand-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:opacity-95 transition">
          {loading ? 'Creating...' : 'Sign Up'}
        </motion.button>
        <p className="text-sm text-center text-gray-500">Have an account? <Link to="/login" className="text-blue-600">Sign in</Link></p>
      </motion.form>
    </section>
  )
}





