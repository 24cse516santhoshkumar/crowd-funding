import { useState, useEffect, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/api'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { User as UserIcon, Mail, IdCard, Edit3, LogOut, Gift, Flag, ArrowRight } from 'lucide-react'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [campaigns, setCampaigns] = useState([])
  const [donations, setDonations] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [updating, setUpdating] = useState(false)
  const navigate = useNavigate()
  
  const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0)
  const initials = useMemo(() => {
    const n = (user?.name || '').trim()
    if (!n) return 'U'
    const parts = n.split(/\s+/)
    return (parts[0]?.[0] || '') + (parts[1]?.[0] || '') || 'U'
  }, [user])
  
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
        
        // Fetch user's campaigns
        const campaignsResponse = await api.get('/api/campaigns/my-campaigns')
        setCampaigns(campaignsResponse.data.content || [])
        
        // Fetch user's donations
        const donationsResponse = await api.get('/api/donations/my-donations')
        setDonations(donationsResponse.data.content || [])
        
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto bg-white rounded-2xl shadow overflow-hidden">
        {/* Profile Header */}
        <div className="relative px-6 py-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-purple-600" />
          <div className="relative flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur text-white font-bold text-xl">
              {initials.toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold">{user.name}</h1>
              <p className="opacity-90 text-sm">Manage your account and view your activity</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white shadow"><UserIcon className="w-5 h-5 text-brand-600" /></div>
              <div>
                <div className="text-xs text-gray-500">Name</div>
                <div className="font-medium">{user.name}</div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white shadow"><Mail className="w-5 h-5 text-purple-600" /></div>
              <div>
                <div className="text-xs text-gray-500">Email</div>
                <div className="font-medium">{user.email}</div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white shadow"><IdCard className="w-5 h-5 text-green-600" /></div>
              <div>
                <div className="text-xs text-gray-500">User ID</div>
                <div className="font-medium">{user.id}</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setIsEditing(!isEditing)} 
              className="inline-flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded hover:bg-brand-700"
            >
              <Edit3 className="w-4 h-4" /> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
              Change Password
            </button>
            <button 
              onClick={() => navigate('/logout')} 
              className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              <LogOut className="w-4 h-4" /> Logout
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

        {/* Activity Section */}
        <div className="p-6 border-t bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Your Activity</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="font-medium mb-2">Your Campaigns</h3>
              {campaigns.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-gray-600">You have created {campaigns.length} campaign(s):</p>
                  <div className="space-y-1">
                    {campaigns.slice(0, 3).map((campaign) => (
                      <motion.div key={campaign.id} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-sm p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium flex items-center justify-between">
                          <span>{campaign.title}</span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-white text-gray-600">{campaign.status}</span>
                        </div>
                        <div className="text-gray-500">
                          Goal: {formatCurrency(campaign.goalAmount)} • Raised: {formatCurrency(campaign.raisedAmount || 0)}
                        </div>
                      </motion.div>
                    ))}
                    {campaigns.length > 3 && (
                      <p className="text-xs text-gray-500">... and {campaigns.length - 3} more</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">You haven't created any campaigns yet</p>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Your Donations</h3>
                {donations.length > 0 && (
                  <Link 
                    to="/donations" 
                    className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                  >
                    View All →
                  </Link>
                )}
              </div>
              {donations.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-gray-600">You have made {donations.length} donation(s):</p>
                  <div className="space-y-1">
                    {donations.slice(0, 3).map((donation) => (
                      <motion.div key={donation.id} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-sm p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium">{formatCurrency(donation.amount)}</div>
                        <div className="text-gray-500">
                          To: {donation.campaign?.title || 'Unknown Campaign'}
                        </div>
                        <div className="text-xs text-gray-400">
                          Date: {new Date(donation.date).toLocaleDateString()}
                        </div>
                      </motion.div>
                    ))}
                    {donations.length > 3 && (
                      <p className="text-xs text-gray-500">... and {donations.length - 3} more</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">You haven't made any donations yet</p>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}