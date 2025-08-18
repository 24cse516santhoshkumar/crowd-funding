
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="relative text-white py-24 px-6 text-center overflow-hidden min-h-[70vh] flex items-center" data-aos="fade-up">
      {/* background image */}
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=60"
        alt="People collaborating and funding ideas"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700/60 via-indigo-700/55 to-blue-700/60" />

      <div className="relative max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight">
          Empower Dreams Through <span className="text-yellow-300">Crowdfunding</span>
        </h1>
        <p className="text-lg mb-8">Join thousands of backers supporting campaigns that change the world.</p>
        <div className="flex justify-center gap-4">
          <Link to="/create" className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition duration-500 ease-out-expo">🚀 Start a Campaign</Link>
          <Link to="/campaigns" className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-500 ease-out-expo">💝 Explore Campaigns</Link>
        </div>
      </div>
    </section>
  )
}
