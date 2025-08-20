import { useEffect, useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserDonations } from '../services/donationService'
import api from '../api/api'
import { Heart, Gift, TrendingUp, Calendar, DollarSign, Users, Target, Award, RefreshCw, Bug } from 'lucide-react'
import { toast } from 'react-toastify'

export default function DonationsPage() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [debugMode, setDebugMode] = useState(false)
  const [debugData, setDebugData] = useState(null)
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalAmount: 0,
    averageAmount: 0,
    uniqueCampaigns: 0
  })
  const [secondsLeft, setSecondsLeft] = useState(30)
  const navigate = useNavigate()
  const previousDonationsCount = useRef(0)

  const fetchDonations = useCallback(async () => {
    try {
      setLoading(true)
      console.log('Fetching donations...')
      
      const response = await getUserDonations(0, 50)
      console.log('API Response:', response)
      const donationsData = response.content || []
      console.log('Donations data:', donationsData)
      
      // Store debug data
      setDebugData({
        timestamp: new Date().toISOString(),
        rawResponse: response,
        processedData: donationsData,
        userToken: localStorage.getItem('token') ? 'Present' : 'Missing'
      })
      
      setDonations(donationsData)
      
      // Calculate stats
      const totalAmount = donationsData.reduce((sum, d) => sum + (d.amount || 0), 0)
      const uniqueCampaigns = new Set(donationsData.map(d => d.campaign?.id)).size
      
      const newStats = {
        totalDonations: donationsData.length,
        totalAmount,
        averageAmount: donationsData.length > 0 ? totalAmount / donationsData.length : 0,
        uniqueCampaigns
      }
      
      console.log('New stats:', newStats)
      setStats(newStats)
      
      // Check if new donations were added
      if (previousDonationsCount.current > 0 && donationsData.length > previousDonationsCount.current) {
        const newDonationsCount = donationsData.length - previousDonationsCount.current
        toast.success(`🎉 ${newDonationsCount} new donation${newDonationsCount > 1 ? 's' : ''} detected!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
      
      previousDonationsCount.current = donationsData.length
      setLoading(false)
    } catch (err) {
      console.error('Error fetching donations:', err)
      setDebugData({
        timestamp: new Date().toISOString(),
        error: err.message,
        userToken: localStorage.getItem('token') ? 'Present' : 'Missing'
      })
      
      let errorMessage = 'Failed to fetch donations. Please try again.'
      if (err.message.includes('Authentication failed')) {
        errorMessage = 'Authentication failed. Please login again.'
        navigate('/login')
      } else if (err.message.includes('Access denied')) {
        errorMessage = 'Access denied. You do not have permission to view donations.'
      } else if (err.message.includes('not found')) {
        errorMessage = 'Donations endpoint not found. Please contact support.'
      }
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      setLoading(false)
    }
  }, [navigate])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchDonations()
    setRefreshing(false)
    setSecondsLeft(30)
    toast.info('✨ Donations data refreshed successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  const testDonationCreation = async () => {
    try {
      // Get the first available campaign (via axios baseURL)
      const campaignsResponse = await api.get('/api/campaigns', { params: { page: 0, size: 1 } })
      const campaigns = campaignsResponse.data?.content || []
      
      if (campaigns.length === 0) {
        toast.error('No campaigns available for testing')
        return
      }

      const testCampaign = campaigns[0]
      const testAmount = 50 // Test donation amount

      toast.info('Creating test donation...', {
        position: "top-right",
        autoClose: 2000,
      })

      // Create a test donation (Authorization header is added by api interceptor)
      const donationResponse = await api.post('/api/donations', {
        campaign: { id: testCampaign.id },
        amount: testAmount,
        date: new Date().toISOString().split('T')[0]
      })

      console.log('Test donation created:', donationResponse.data)
      
      toast.success('Test donation created successfully!', {
        position: "top-right",
        autoClose: 3000,
      })

      // Refresh the donations list
      setTimeout(() => {
        fetchDonations()
      }, 800)

    } catch (error) {
      console.error('Test donation failed:', error)
      const msg = error.response?.data?.message || error.message || 'Unknown error'
      toast.error('Test donation failed: ' + msg, {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    fetchDonations()
  }, [navigate, fetchDonations])

  // Refresh data when page comes into focus (e.g., after making a donation)
  useEffect(() => {
    const handleFocus = () => {
      fetchDonations()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [fetchDonations])

  // Periodic refresh every 30 seconds when page is active
  useEffect(() => {
    const tick = setInterval(() => {
      if (document.visibilityState !== 'visible') return
      setSecondsLeft(prev => {
        if (prev <= 1) {
          fetchDonations()
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(tick)
  }, [fetchDonations])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDonationIcon = (amount) => {
    if (amount >= 1000) return <Award className="w-6 h-6 text-yellow-500" />
    if (amount >= 500) return <TrendingUp className="w-6 h-6 text-green-500" />
    if (amount >= 100) return <Gift className="w-6 h-6 text-blue-500" />
    return <Heart className="w-6 h-6 text-red-500" />
  }

  const getDonationBadge = (amount) => {
    if (amount >= 1000) return { text: 'Major Supporter', color: 'bg-yellow-100 text-yellow-800' }
    if (amount >= 500) return { text: 'Generous Donor', color: 'bg-green-100 text-green-800' }
    if (amount >= 100) return { text: 'Supporter', color: 'bg-blue-100 text-blue-800' }
    return { text: 'Donor', color: 'bg-red-100 text-red-800' }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your generosity...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-purple-600 opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center animate-slide-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand-500 to-purple-500 rounded-full mb-6 animate-pulse-slow">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Your Generosity Journey
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              Every donation tells a story of hope, support, and positive change. 
              Here's your impact in action.
            </p>
            <div className="flex items-center gap-4 justify-center">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:shadow-xl"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? 'Refreshing...' : 'Refresh Data'}</span>
              </button>
              <button
                onClick={() => setDebugMode(!debugMode)}
                className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full shadow-lg hover:bg-yellow-200 transition-all duration-300"
              >
                <Bug className="w-4 h-4" />
                <span>{debugMode ? 'Hide Debug' : 'Debug Mode'}</span>
              </button>
              <button
                onClick={testDonationCreation}
                className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full shadow-lg hover:bg-green-200 transition-all duration-300"
              >
                <Gift className="w-4 h-4" />
                <span>Test Donation</span>
              </button>
              <div className="text-sm text-gray-500 bg-white/60 px-3 py-1 rounded-full">
                Auto-refresh in {secondsLeft}s
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Section */}
      {debugMode && debugData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Debug Information</h3>
            <div className="text-sm text-yellow-700 space-y-2">
              <p><strong>Last Updated:</strong> {debugData.timestamp}</p>
              <p><strong>User Token:</strong> {debugData.userToken}</p>
              <p><strong>Donations Count:</strong> {donations.length}</p>
              <p><strong>Previous Count:</strong> {previousDonationsCount.current}</p>
              {debugData.error && (
                <div className="bg-red-50 border border-red-200 rounded p-2">
                  <p><strong>Error:</strong> {debugData.error}</p>
                  <pre className="text-xs mt-1">{JSON.stringify(debugData.errorResponse, null, 2)}</pre>
                </div>
              )}
              {debugData.rawResponse && (
                <details className="mt-2">
                  <summary className="cursor-pointer font-medium">Raw API Response</summary>
                  <pre className="text-xs mt-1 bg-white p-2 rounded border overflow-auto max-h-40">
                    {JSON.stringify(debugData.rawResponse, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalDonations}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Gift className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalAmount)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Donation</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.averageAmount)}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Campaigns Supported</p>
                <p className="text-3xl font-bold text-gray-900">{stats.uniqueCampaigns}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donations List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {donations.length > 0 ? (
          <div className="space-y-6">
            <div className="text-center mb-8 animate-slide-in-up">
              <h2 className="text-3xl font-bold gradient-text mb-2">Your Donation History</h2>
              <p className="text-gray-600">Each card represents a moment of generosity</p>
            </div>
            
            <div className="grid gap-6">
              {donations.map((donation, index) => (
                <div 
                  key={donation.id}
                  className="bg-white rounded-2xl shadow-lg p-6 donation-card border-l-4 border-brand-500 animate-slide-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getDonationIcon(donation.amount)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {donation.campaign?.title || 'Unknown Campaign'}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDonationBadge(donation.amount).color}`}>
                            {getDonationBadge(donation.amount).text}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">
                          Your generous contribution helped bring this campaign closer to its goal.
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(donation.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>Campaign ID: {donation.campaign?.id || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-brand-600 mb-1">
                        {formatCurrency(donation.amount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Donation #{donation.id}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 animate-slide-in-up">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6 animate-pulse-slow">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold gradient-text mb-2">No Donations Yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start your generosity journey by supporting amazing campaigns. 
              Every donation makes a difference!
            </p>
            <button
              onClick={() => navigate('/campaigns')}
              className="bg-gradient-to-r from-brand-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-brand-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg animate-pulse-slow"
            >
              Explore Campaigns
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
