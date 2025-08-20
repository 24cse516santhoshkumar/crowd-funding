import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import { toast } from 'react-toastify'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [editingUser, setEditingUser] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', isAdmin: false, password: '' })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('AdminDashboard - Token exists:', !!token)
    if (!token) {
      console.log('AdminDashboard - No token, redirecting to login')
      navigate('/login')
      return
    }

    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    console.log('AdminDashboard - User data from localStorage:', userData)
    
    // Check if user is admin
    console.log('AdminDashboard - Is admin?', userData.isAdmin)
    if (!userData.isAdmin) {
      console.log('AdminDashboard - Not admin, redirecting to home')
      navigate('/')
      return
    }
    
    // Fetch users data
    const fetchUsers = async () => {
      try {
        setLoading(true)
        console.log('AdminDashboard - Fetching users data')
        const { data } = await api.get('/api/users')
        console.log('AdminDashboard - Users data:', data)
        setUsers(data.content || [])
        setLoading(false)
      } catch (err) {
        console.error('AdminDashboard - Error fetching users:', err)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const startEdit = (u) => {
    setEditingUser(u)
    setForm({ name: u.name || '', email: u.email || '', isAdmin: !!u.isAdmin, password: '' })
  }

  const saveEdit = async () => {
    if (!editingUser) return
    try {
      const payload = { name: form.name.trim(), email: (form.email || '').trim().toLowerCase(), isAdmin: form.isAdmin }
      if (form.password && form.password.length >= 6) payload.password = form.password
      const { data } = await api.put(`/api/users/${editingUser.id}`, payload)
      setUsers(prev => prev.map(u => (u.id === editingUser.id ? data : u)))
      setEditingUser(null)
      toast.success('User updated')
    } catch (err) {
      console.error('AdminDashboard - Save edit error:', err)
      toast.error('Failed to update user')
    }
  }

  const deleteUser = async (u) => {
    if (!confirm(`Delete user "${u.name}"?`)) return
    try {
      await api.delete(`/api/users/${u.id}`)
      setUsers(prev => prev.filter(x => x.id !== u.id))
      toast.success('User deleted')
    } catch (err) {
      console.error('AdminDashboard - Delete error:', err)
      toast.error('Failed to delete user')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        {/* Admin Dashboard Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="opacity-90">Manage users and system settings</p>
        </div>

        {/* Users List */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.isAdmin ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Yes</span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => startEdit(user)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                      <button onClick={() => deleteUser(user)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {editingUser && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
              <h3 className="text-lg font-semibold">Edit User</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Name</label>
                  <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email</label>
                  <input value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} className="w-full border p-2 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <input id="isAdmin" type="checkbox" checked={form.isAdmin} onChange={(e)=>setForm({...form, isAdmin: e.target.checked})} />
                  <label htmlFor="isAdmin" className="text-sm text-gray-700">Is Admin</label>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Password (optional, min 6)</label>
                  <input type="password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} className="w-full border p-2 rounded" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={()=>setEditingUser(null)} className="px-4 py-2 rounded bg-gray-100">Cancel</button>
                <button onClick={saveEdit} className="px-4 py-2 rounded bg-indigo-600 text-white">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}