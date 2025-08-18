import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      console.log('Attempting login with:', { email, password })
      const { data } = await api.post('/api/auth/login', { email, password })
      console.log('Login response:', data)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      console.log('User data stored:', data.user)
      navigate('/home')
    }catch(err){
      alert('Invalid credentials')
      console.error('Login error:', err)
    }finally{
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* background image */}
      <img
        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=60"
        alt="Abstract workspace background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-indigo-800/50 to-blue-900/60" />

      <form onSubmit={submit} className="relative z-10 w-full max-w-sm bg-white/95 backdrop-blur shadow rounded p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign in</h2>
        <input type="email" placeholder="Email" className="w-full border p-3 rounded" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full border p-3 rounded" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <p className="text-sm text-center text-gray-500">No account? <Link to="/register" className="text-blue-600">Register</Link></p>
      </form>
    </section>
  )
}





