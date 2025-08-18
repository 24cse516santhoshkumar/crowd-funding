import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import { toast } from 'react-toastify'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [campaigns, setCampaigns] = useState([])
  const [donations, setDonations] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [updating, setUpdating] = useState(false)
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdating(true)
    
    try {
      // Get the user ID from localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}')
      const userId = userData.id
      
      if (!userId) {
        throw new Error('User ID not found')
      }
      
      // Prefer self endpoint
      const response = await api.put(`/api/users/me`, formData)
      
      // Update the user state and localStorage with the updated user data
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email
      }
      
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      // Show success message and exit edit mode
      toast.success('Profile updated successfully')
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setUpdating(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    setUser(userData)
    setFormData({
      name: userData.name || '',
      email: userData.email || ''
    })
    
    // Fetch user's campaigns and donations
    const fetchUserData = async () => {
      try {
        setLoading(true)
        // You can expand this to fetch more user-related data
        // For example, user's campaigns, donations, etc.
        setLoading(false)
      } catch (err) {
        console.error('Error fetching user data:', err)
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Not Logged In</h2>
          <p className="mb-4">Please log in to view your profile</p>
          <button 
            onClick={() => navigate('/login')} 
            className="bg-brand-600 text-white px-6 py-2 rounded hover:bg-brand-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">User Profile</h1>
          <p className="opacity-90">Manage your account and view your activity</p>
        </div>

        {/* User Info */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">User ID</p>
              <p className="font-medium">{user.id}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setIsEditing(!isEditing)} 
              className="bg-brand-600 text-white px-4 py-2 rounded hover:bg-brand-700"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
              Change Password
            </button>
            <button 
              onClick={() => navigate('/logout')} 
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
          
          {isEditing && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Edit Profile Information</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={updating}
                    className="bg-brand-600 text-white px-4 py-2 rounded hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Activity Section - can be expanded with actual data */}
        <div className="p-6 border-t bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Your Activity</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="font-medium mb-2">Your Campaigns</h3>
              <p className="text-gray-500">
                {campaigns.length > 0 
                  ? `You have created ${campaigns.length} campaigns` 
                  : "You haven't created any campaigns yet"}
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="font-medium mb-2">Your Donations</h3>
              <p className="text-gray-500">
                {donations.length > 0 
                  ? `You have made ${donations.length} donations` 
                  : "You haven't made any donations yet"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}