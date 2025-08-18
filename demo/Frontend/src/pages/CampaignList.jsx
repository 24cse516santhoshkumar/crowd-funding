
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'

export default function CampaignList(){
  const [campaigns, setCampaigns] = useState([])
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState('')

  useEffect(()=>{
    const params = {}
    if (status) params.status = status
    if (category) params.category = category
    api.get('/campaigns', { params })
      .then(res => setCampaigns(res.data))
      .catch(console.error)
  }, [status, category])

  const pct = (c) => Math.min(100, ((c.currentAmount || 0) / (c.goalAmount || 1) * 100).toFixed(1))

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">All Campaigns</h2>
        <div className="flex gap-3">
          <select value={category} onChange={e=>setCategory(e.target.value)} className="border rounded px-3 py-2">
            <option value="">All Categories</option>
            <option>Education</option><option>Medical</option><option>Animals</option>
            <option>Environment</option><option>Community</option><option>Technology</option><option>Arts</option>
          </select>
          <select value={status} onChange={e=>setStatus(e.target.value)} className="border rounded px-3 py-2">
            <option value="">All Status</option>
            <option>ACTIVE</option><option>COMPLETED</option><option>EXPIRED</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {campaigns.map(c => (
          <div key={c.id} className="bg-white rounded-lg shadow-lg p-5 hover:shadow-2xl transition transform hover:-translate-y-2" data-aos="zoom-in">
            <h3 className="text-xl font-semibold text-indigo-700">{c.title}</h3>
            <p className="text-gray-600 my-2">{(c.description || '').slice(0, 110)}...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${pct(c)}%` }} />
            </div>
            <p className="text-sm text-gray-500">₹{c.currentAmount} / ₹{c.goalAmount} raised</p>
            <p className="text-xs text-gray-500">Status: {c.status} • Category: {c.category}</p>
            <Link to={`/campaign/${c.id}`} className="mt-3 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
