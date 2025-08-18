
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function CreateCampaign(){
  const [form, setForm] = useState({ title:'', description:'', goalAmount:'', deadline:'', category:'', creatorName:'' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const change = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const { data } = await api.post('/api/campaigns', {
        title: form.title,
        description: form.description,
        goalAmount: parseFloat(form.goalAmount),
        endDate: form.deadline,
        category: form.category ? { name: form.category } : undefined
      })
      alert('🎉 Campaign Created!')
      navigate(`/campaigns/${data.id}`)
    }catch(err){
      alert('❌ Error creating campaign')
      console.error(err)
    }finally{
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=60"
        alt="Creative workspace planning a campaign"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/95" />

      <div className="relative max-w-3xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Create a New Campaign</h2>
        <form onSubmit={submit} className="bg-white/95 backdrop-blur shadow-md rounded-lg p-6 space-y-4">
          <input name="title" placeholder="Campaign Title (5-100 chars)" className="w-full border p-3 rounded" required minLength={5} maxLength={100} onChange={change} />
          <textarea name="description" placeholder="Campaign Description (20-500 chars)" className="w-full border p-3 rounded" required minLength={20} maxLength={500} onChange={change} />
          <input type="number" step="0.01" name="goalAmount" placeholder="Goal Amount (min 100.00)" className="w-full border p-3 rounded" required min="100" onChange={change} />
          <input type="date" name="deadline" className="w-full border p-3 rounded" required onChange={change} />
          <select name="category" className="w-full border p-3 rounded" required onChange={change}>
            <option value="">Select Category</option>
            <option>Education</option><option>Medical</option><option>Animals</option>
            <option>Environment</option><option>Community</option><option>Technology</option><option>Arts</option>
          </select>
          <input name="creatorName" placeholder="Your Name" className="w-full border p-3 rounded" required maxLength={100} onChange={change} />
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition">
            {loading ? 'Creating...' : 'Create Campaign 🚀'}
          </button>
        </form>
      </div>
    </section>
  )
}
