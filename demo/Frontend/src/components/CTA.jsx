
import { Link } from 'react-router-dom'

export default function CTA(){
  return (
    <section className="bg-indigo-700 text-white py-16 text-center" data-aos="fade-right">
      <h2 className="text-3xl font-bold mb-4">Have a vision? Let’s make it real. 🌟</h2>
      <p className="mb-6">Create a campaign today and connect with supporters worldwide.</p>
      <Link to="/create" className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">Start a Campaign 🚀</Link>
    </section>
  )
}
