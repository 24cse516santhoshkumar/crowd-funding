// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Coins } from "lucide-react";
import { useEffect, useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthed(!!token);
    
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      console.log('Navbar - User data from localStorage:', userData);
      setUser(userData);
    } else {
      setUser(null);
    }
    
    const handler = () => {
      const newToken = localStorage.getItem('token');
      setIsAuthed(!!newToken);
      if (newToken) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        console.log('Navbar - User data updated from storage event:', userData);
        setUser(userData);
      } else {
        setUser(null);
      }
    }
    
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  // Re-check auth on every route change (covers same-tab login/logout)
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthed(!!token);
    
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
    } else {
      setUser(null);
    }
  }, [location])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 60 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold">
          <Coins className="w-7 h-7 text-accent-300" />
          <span className="text-white">CrowdFund</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-medium text-white/90">
          <Link to="/" className="hover:text-white transition">Landing</Link>
          <Link to="/campaigns" className="hover:text-white transition">Campaigns</Link>
          <Link to="/create" className="hover:text-white transition">Create</Link>
          <Link to="/about" className="hover:text-white transition">About</Link>
          {!isAuthed ? (
            <Link to="/login" className="hover:text-white transition">Login</Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/home" className="hover:text-white transition">Home</Link>
              <Link to="/profile" className="text-accent-300 font-medium hover:text-white transition">Hi, {user?.name || 'User'}</Link>
              {user?.isAdmin && (
                <Link to="/admin" className="text-yellow-300 font-medium hover:text-white transition">Admin</Link>
              )}
              <Link to="/logout" className="hover:text-white transition">Logout</Link>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Link
          to="/create"
          className="hidden md:inline-block bg-accent-500 text-white px-5 py-2 rounded-full shadow hover:bg-accent-600 transition"
        >
          Start a Campaign
        </Link>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-brand-700/95 text-white backdrop-blur-md shadow-lg"
        >
          <div className="flex flex-col items-center space-y-4 py-6 text-lg font-medium">
            <Link to="/" onClick={() => setOpen(false)}>Landing</Link>
            <Link to="/campaigns" onClick={() => setOpen(false)}>Campaigns</Link>
            <Link to="/create" onClick={() => setOpen(false)}>Create</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            {!isAuthed ? (
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
            ) : (
              <>
                <Link to="/home" onClick={() => setOpen(false)}>Home</Link>
                <Link to="/profile" onClick={() => setOpen(false)} className="text-accent-300 font-medium">Hi, {user?.name || 'User'}</Link>
                {user?.isAdmin && (
                  <Link to="/admin" onClick={() => setOpen(false)} className="text-yellow-300 font-medium">Admin Dashboard</Link>
                )}
                <Link to="/logout" onClick={() => setOpen(false)}>Logout</Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
