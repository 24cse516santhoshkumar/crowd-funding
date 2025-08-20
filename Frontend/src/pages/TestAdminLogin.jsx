import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function TestAdminLogin() {
  const [email, setEmail] = useState('maddox@gmail.com')
  const [password, setPassword] = useState('sandy')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResponse(null)
    setError(null)
    
    try {
      console.log('Test Admin Login - Attempting login with:', { email, password })
      const { data } = await api.post('/api/auth/login', { email, password })
      console.log('Test Admin Login - Login response:', data)
      setResponse(data)
      
      // Store in localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      console.log('Test Admin Login - User data stored:', data.user)
    } catch (err) {
      console.error('Test Admin Login - Error:', err)
      setError(err.response?.data || err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white shadow rounded p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Test Admin Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full border p-3 rounded" 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full border p-3 rounded" 
          value={password} 
          onChange={e=>setPassword(e.target.value)} 
          required 
        />
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          {loading ? 'Testing...' : 'Test Admin Login'}
        </button>
      </form>
      
      {response && (
        <div className="mt-8 w-full max-w-sm bg-green-50 border border-green-200 rounded p-4">
          <h3 className="font-bold text-green-800">Success Response:</h3>
          <pre className="mt-2 whitespace-pre-wrap overflow-auto max-h-60 text-sm">
            {JSON.stringify(response, null, 2)}
          </pre>
          <div className="mt-4 flex justify-between">
            <button 
              onClick={() => navigate('/admin')} 
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Go to Admin Dashboard
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-8 w-full max-w-sm bg-red-50 border border-red-200 rounded p-4">
          <h3 className="font-bold text-red-800">Error:</h3>
          <pre className="mt-2 whitespace-pre-wrap overflow-auto max-h-60 text-sm">
            {typeof error === 'object' ? JSON.stringify(error, null, 2) : error}
          </pre>
        </div>
      )}
    </div>
  )
}