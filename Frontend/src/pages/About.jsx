import { motion } from 'framer-motion'
import { HeartHandshake, ShieldCheck, Rocket, Users, Globe2, LineChart, Sparkles } from 'lucide-react'

export default function About(){
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* background image */}
      <img
        src="https://images.unsplash.com/photo-1529336953121-a0ce9a0bfbf3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=60"
        alt="Team collaborating about vision and impact"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/90" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-20 py-16">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm text-brand-700 text-sm">
            <Sparkles className="w-4 h-4" /> Our story
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900">About <span className="gradient-text">CrowdFund</span></h1>
          <p className="mt-4 text-gray-700 leading-7 max-w-3xl">
            CrowdFund is a simple, transparent crowdfunding platform where creators can launch
            campaigns and supporters can contribute to bring ideas to life. Track progress in
            real-time, celebrate milestones, and build community around meaningful projects.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[{
            title: 'Mission', desc: 'Empower anyone to fund, build, and share impactful ideas.', icon: HeartHandshake, color: 'from-blue-500/10 to-blue-500/0', text: 'text-blue-700', bg: 'bg-blue-50/80'
          }, {
            title: 'How it works', desc: 'Create a campaign, receive donations, and track progress.', icon: Rocket, color: 'from-green-500/10 to-green-500/0', text: 'text-green-700', bg: 'bg-green-50/80'
          }, {
            title: 'Trust & Safety', desc: 'Clear goals, visible totals, and secure payment flows.', icon: ShieldCheck, color: 'from-indigo-500/10 to-indigo-500/0', text: 'text-indigo-700', bg: 'bg-indigo-50/80'
          }].map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className={`relative p-6 rounded-2xl ${f.bg} backdrop-blur-sm overflow-hidden`}>
                <div className={`pointer-events-none absolute -inset-px bg-gradient-to-br ${f.color}`} />
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow ${f.text}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`mt-3 font-semibold ${f.text}`}>{f.title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{f.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Why CrowdFund */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-brand-600" />
              <h4 className="font-semibold">Built for community</h4>
            </div>
            <p className="text-sm text-gray-600 mt-2">Collaborate with backers, share updates, and grow together.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-3">
              <LineChart className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold">Transparent progress</h4>
            </div>
            <p className="text-sm text-gray-600 mt-2">See funding in real time with clear milestones and stats.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-3">
              <Globe2 className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold">Open and accessible</h4>
            </div>
            <p className="text-sm text-gray-600 mt-2">Accessible from anywhere with modern, secure technology.</p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
          <a href="/create" className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-purple-600 text-white px-5 py-3 rounded-xl font-medium shadow hover:opacity-95 transition">
            Start a Campaign
          </a>
        </motion.div>
      </div>
    </section>
  )
}





