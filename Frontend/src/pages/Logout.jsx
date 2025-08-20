import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout(){
  const navigate = useNavigate()

  useEffect(() => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } finally {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Logging out...
    </div>
  )
}









