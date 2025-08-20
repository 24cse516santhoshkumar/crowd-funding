
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'

export default function FeaturedCampaigns(){
  const [campaigns, setCampaigns] = useState([])

  useEffect(()=>{
    api.get('/api/campaigns', { params: { page: 0, size: 6, sortBy: 'id' } })
      .then(res => {
        const list = res.data?.content ?? res.data
        setCampaigns((Array.isArray(list) ? list : []).slice(0,3))
      })
      .catch(console.error)
  },[])

  const pct = (c) => Math.min(100, (((c.raisedAmount || 0) / (c.goalAmount || 1)) * 100).toFixed(1))

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">✨ Featured Campaigns</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {campaigns.map(c => (
          <div key={c.id} className="bg-white rounded-lg shadow-lg p-5 hover:shadow-2xl transition transform hover:-translate-y-2" data-aos="zoom-in">
            <h3 className="text-xl font-semibold text-indigo-700">{c.title}</h3>
            <p className="text-gray-600 my-2">{(c.description || '').slice(0, 90)}...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${pct(c)}%` }} />
            </div>
            <p className="text-sm text-gray-500">₹{c.raisedAmount} / ₹{c.goalAmount} raised</p>
            <Link to={`/campaigns/${c.id}`} className="mt-3 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">View Details</Link>
          </div>
        ))}
      </div>
    </section>
  )
}
