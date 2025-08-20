import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Sparkles, Github, Chrome } from 'lucide-react'
import { toast } from 'react-toastify'
import api from '../api/api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)
  const navigate = useNavigate()
  
  const backgrounds = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2000&auto=format&fit=crop'
  ]
  const bgUrl = useMemo(() => backgrounds[Math.floor(Math.random()*backgrounds.length)], [])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      console.log('Attempting login with:', { email, password })
      const { data } = await api.post('/api/auth/login', { email: (email||'').trim().toLowerCase(), password })
      console.log('Login response:', data)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      console.log('User data stored:', data.user)
      toast.success('Welcome back!')
      navigate('/')
    }catch(err){
      toast.error('Invalid credentials')
      console.error('Login error:', err)
    }finally{
      setLoading(false)
    }
  }

  // OAuth Login Functions
  const handleGoogleLogin = async () => {
    try {
      // In a real app, you'd integrate with Google OAuth
      // For now, we'll simulate it
      toast.info('Google OAuth integration coming soon!')
    } catch (error) {
      toast.error('Google login failed')
    }
  }

  const handleAppleLogin = async () => {
    try {
      // In a real app, you'd integrate with Apple Sign-In
      // For now, we'll simulate it
      toast.info('Apple Sign-In integration coming soon!')
    } catch (error) {
      toast.error('Apple login failed')
    }
  }

  // Forgot Password Function
  const handleForgotPassword = async (e) => {
    e.preventDefault()
    if (!forgotPasswordEmail.trim()) {
      toast.error('Please enter your email address')
      return
    }

    setForgotPasswordLoading(true)
    try {
      await api.post('/api/auth/forgot-password', { email: forgotPasswordEmail.trim() })
      toast.success('Password reset link sent to your email!')
      setShowForgotPassword(false)
      setForgotPasswordEmail('')
    } catch (error) {
      toast.error('Failed to send reset link. Please try again.')
    } finally {
      setForgotPasswordLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* backdrop */}
      <img
        src={bgUrl}
        alt="Abstract workspace background"
        className="absolute inset-0 h-full w-full object-cover"
      />
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
            <Sparkles className="w-4 h-4" /> Welcome back
          </div>
          <h2 className="mt-2 text-2xl font-extrabold">Sign in</h2>
        </div>

        <div className="space-y-3">
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
          {loading ? 'Signing in...' : 'Sign In'}
        </motion.button>

        {/* Forgot Password Link */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Forgot your password?
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Chrome className="w-4 h-4 text-red-500" />
            Google
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleAppleLogin}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Github className="w-4 h-4 text-black" />
            Apple
          </motion.button>
        </div>

        <p className="text-sm text-center text-gray-500">No account? <Link to="/register" className="text-blue-600">Register</Link></p>
      </motion.form>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowForgotPassword(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Reset Password</h3>
            <p className="text-gray-600 mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotPasswordLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {forgotPasswordLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}





