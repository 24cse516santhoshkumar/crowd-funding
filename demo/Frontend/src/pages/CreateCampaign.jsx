
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Calendar, Target, Coins, ArrowRight } from 'lucide-react'
import { toast } from 'react-toastify'
import api from '../api/api'

export default function CreateCampaign(){
  const [form, setForm] = useState({ title:'', description:'', goalAmount:'', deadline:'', category:'', creatorName:'' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const titleLen = form.title.length
  const descLen = form.description.length
  const minGoal = 100
  const goalOk = Number(form.goalAmount || 0) >= minGoal
  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

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
      toast.success('🎉 Campaign created successfully!')
      navigate(`/campaigns/${data.id}`)
    }catch(err){
      toast.error('❌ Error creating campaign')
      console.error(err)
    }finally{
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm text-brand-700 text-sm">
            <Sparkles className="w-4 h-4" /> Launch your idea
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold gradient-text">Create a New Campaign</h2>
          <p className="mt-2 text-gray-600">Tell your story, set a goal, and pick a category. We’ll help you inspire backers.</p>
        </motion.div>

        {/* Card */}
        <motion.form onSubmit={submit} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="group relative bg-white rounded-2xl shadow p-6 space-y-5">
          {/* Animated ring */}
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-brand-500/0 via-brand-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition" />

          {/* Title */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block">Campaign Title</label>
            <input name="title" placeholder="5-100 characters" className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" required minLength={5} maxLength={100} onChange={change} />
            <div className="mt-1 text-xs text-gray-500 text-right">{titleLen}/100</div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block">Description</label>
            <textarea name="description" placeholder="Describe your campaign (20-500 chars)" className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" rows={4} required minLength={20} maxLength={500} onChange={change} />
            <div className="mt-1 text-xs text-gray-500 text-right">{descLen}/500</div>
          </div>

          {/* Goal + Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block flex items-center gap-2"><Coins className="w-4 h-4 text-amber-600" /> Goal Amount</label>
              <input type="number" step="0.01" name="goalAmount" placeholder={`Minimum ${minGoal.toFixed(2)}`} className={`w-full border p-3 rounded-xl focus:outline-none focus:ring-2 ${goalOk ? 'focus:ring-brand-500' : 'focus:ring-red-500'}`} required min={minGoal} onChange={change} />
              <div className={`mt-1 text-xs ${goalOk ? 'text-green-600' : 'text-red-600'}`}>{goalOk ? 'Looks good' : `Minimum goal is ₹${minGoal}`}</div>
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block flex items-center gap-2"><Calendar className="w-4 h-4 text-purple-600" /> Deadline</label>
              <input type="date" name="deadline" min={today} className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" required onChange={change} />
            </div>
          </div>

          {/* Category + Creator */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block flex items-center gap-2"><Target className="w-4 h-4 text-blue-600" /> Category</label>
              <select name="category" className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required onChange={change}>
                <option value="">Select Category</option>
                <option>Education</option><option>Medical</option><option>Animals</option>
                <option>Environment</option><option>Community</option><option>Technology</option><option>Arts</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Your Name</label>
              <input name="creatorName" placeholder="How should we address you?" className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" required maxLength={100} onChange={change} />
            </div>
          </div>

          {/* Submit */}
          <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:opacity-95 transition disabled:opacity-60">
            {loading ? 'Creating...' : 'Create Campaign'} {loading ? null : <ArrowRight className="w-4 h-4" />}
          </motion.button>

          {/* Tiny helper */}
          <div className="text-[11px] text-gray-500 text-center">Secure & fast • You can edit details later</div>
        </motion.form>
      </div>
    </section>
  )
}
