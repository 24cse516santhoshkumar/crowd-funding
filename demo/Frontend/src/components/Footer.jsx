
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

export default function Footer(){
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">CrowdFundIt</h2>
          <p className="text-sm">Empowering ideas, funding dreams, and building communities through secure crowdfunding.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/campaigns" className="hover:text-yellow-400">Explore Campaigns</Link></li>
            <li><Link to="/create" className="hover:text-yellow-400">Start a Campaign</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400">Help Center</a></li>
            <li><a href="#" className="hover:text-yellow-400">FAQs</a></li>
            <li><a href="#" className="hover:text-yellow-400">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-400"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-yellow-400"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-yellow-400"><FaLinkedinIn size={20} /></a>
            <a href="#" className="hover:text-yellow-400"><FaInstagram size={20} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">© {new Date().getFullYear()} CrowdFundIt. All rights reserved.</div>
    </footer>
  )
}
