import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api from '../api/api'
import { Heart, School, Stethoscope, Trees, Ship, Cpu } from 'lucide-react'

const iconMap = {
  health: Stethoscope,
  education: School,
  environment: Trees,
  technology: Cpu,
  community: Heart,
  other: Ship
}

export default function CategoriesSection(){
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    api.get('/api/categories')
      .then(res => setCategories(Array.isArray(res.data) ? res.data : []))
      .catch(()=>{
        setCategories([
          { id: 1, name: 'Health', key: 'health', description: 'Medical expenses, treatments and wellness.' },
          { id: 2, name: 'Education', key: 'education', description: 'Scholarships, school projects and learning.' },
          { id: 3, name: 'Environment', key: 'environment', description: 'Sustainability, conservation and climate.' },
          { id: 4, name: 'Technology', key: 'technology', description: 'Innovative products and open-source tools.' },
          { id: 5, name: 'Community', key: 'community', description: 'Local causes and social impact.' }
        ])
      })
  },[])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map(cat => {
            const key = (cat.key || cat.name || '').toString().toLowerCase()
            const Icon = iconMap[key] || iconMap.other
            return (
              <motion.div key={cat.id || key} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -3 }} className="bg-blue-50 rounded-xl p-5 shadow hover:shadow-md transition border border-blue-100">
                <Icon className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{cat.description || 'Explore campaigns in this category.'}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}




