import { useEffect, useState } from 'react'
import api from '../api/api'

export default function StatsSection(){
  const [stats, setStats] = useState({ campaigns: 0, backers: 0, raised: 0 })

  useEffect(()=>{
    Promise.all([
      api.get('/api/campaigns', { params: { page: 0, size: 1 } }).catch(()=>({ data: { totalElements: 0 } })),
      api.get('/api/donations').catch(()=>({ data: [] })),
      api.get('/api/users').catch(()=>({ data: [] }))
    ]).then(([camps, dons, users]) => {
      const campaigns = (camps?.data?.totalElements) ?? (Array.isArray(camps?.data) ? camps.data.length : 0)
      const backers = Array.isArray(users?.data) ? users.data.length : 0
      const raised = Array.isArray(dons?.data) ? dons.data.reduce((sum, d) => sum + (d.amount || 0), 0) : 0
      setStats({ campaigns, backers, raised })
    }).catch(()=>{})
  },[])

  const formatMoney = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-2xl shadow p-8">
            <div className="text-4xl font-extrabold text-blue-600">{stats.campaigns}</div>
            <div className="text-gray-600 mt-1">Active Campaigns</div>
          </div>
          <div className="bg-white rounded-2xl shadow p-8">
            <div className="text-4xl font-extrabold text-green-600">{stats.backers}</div>
            <div className="text-gray-600 mt-1">Registered Backers</div>
          </div>
          <div className="bg-white rounded-2xl shadow p-8">
            <div className="text-4xl font-extrabold text-purple-600">{formatMoney(stats.raised)}</div>
            <div className="text-gray-600 mt-1">Total Raised</div>
          </div>
        </div>
      </div>
    </section>
  )
}



