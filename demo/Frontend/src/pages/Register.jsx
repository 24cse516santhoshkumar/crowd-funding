import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/api'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const { data } = await api.post('/api/auth/register', { name, email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/home')
    }catch(err){
      alert('Failed to register')
      console.error(err)
    }finally{
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* background image */}
      <img
        src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=60"
        alt="Abstract creative background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-indigo-800/50 to-blue-900/60" />

      <form onSubmit={submit} className="relative z-10 w-full max-w-sm bg-white/95 backdrop-blur shadow rounded p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Create account</h2>
        <input placeholder="Name" className="w-full border p-3 rounded" value={name} onChange={e=>setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="w-full border p-3 rounded" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full border p-3 rounded" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          {loading ? 'Creating...' : 'Sign Up'}
        </button>
        <p className="text-sm text-center text-gray-500">Have an account? <Link to="/login" className="text-blue-600">Sign in</Link></p>
      </form>
    </section>
  )
}





