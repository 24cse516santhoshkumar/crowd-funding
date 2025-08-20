// src/pages/CampaignsPage.jsx
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader2, Target, Users, Clock, Search, Filter, Sparkles, ArrowUpRight, Flame } from "lucide-react";
import { toast } from 'react-toastify';
import api from "../api/api";
import { startCampaign } from "../services/campaignService";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Fetch campaigns from backend
  useEffect(() => {
    api
      .get("/api/campaigns", { params: { page: 0, size: 50, sortBy: "id" } })
      .then((res) => {
        const content = res.data?.content ?? res.data;
        setCampaigns(Array.isArray(content) ? content : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching campaigns:", err);
        setLoading(false);
      });
  }, []);

  const handleStart = async (id) => {
    try {
      const updated = await startCampaign(id);
      setCampaigns((prev) => prev.map((c) => (c.id === id ? updated : c)));
      toast.success('Campaign started successfully');
      
    } catch (err) {
      console.error('Error in handleStart:', err);
      toast.error('Failed to start campaign. Please try again.');
    }
  };

  const filteredCampaigns = useMemo(() => {
    let list = [...campaigns];
    if (statusFilter !== 'ALL') list = list.filter(c => c.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c => (c.title || '').toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q));
    }
    switch (sortBy) {
      case 'goal':
        list.sort((a,b) => (b.goalAmount||0) - (a.goalAmount||0));
        break;
      case 'raised':
        list.sort((a,b) => (b.raisedAmount||0) - (a.raisedAmount||0));
        break;
      case 'ending':
        list.sort((a,b) => new Date(a.endDate||0) - new Date(b.endDate||0));
        break;
      default:
        list.sort((a,b) => (b.id||0) - (a.id||0));
    }
    return list;
  }, [campaigns, search, sortBy, statusFilter]);

  if (loading) {
    return (
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-20 py-16">
          <div className="h-10 w-64 bg-gray-200/80 rounded animate-pulse" />
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow overflow-hidden">
                <div className="h-48 w-full bg-gray-100 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-6 w-1/2 bg-gray-100 animate-pulse rounded" />
                  <div className="h-4 w-full bg-gray-100 animate-pulse rounded" />
                  <div className="h-4 w-2/3 bg-gray-100 animate-pulse rounded" />
                  <div className="h-8 w-full bg-gray-100 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Decorative gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-20 py-14">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm text-brand-700 text-sm">
            <Sparkles className="w-4 h-4" /> Discover great causes
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900">Explore <span className="gradient-text">Campaigns</span></h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Support ideas you love. Filter, sort, and find campaigns that match your passion.</p>
        </motion.div>

        {/* Controls */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <div className="flex items-center gap-2 bg-white rounded-xl shadow px-4 py-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search campaigns..." className="w-full outline-none py-2" />
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow px-4 py-2 flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)} className="w-full bg-transparent outline-none py-2">
                <option value="ALL">All statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow px-4 py-2 flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-gray-500" />
              <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="w-full bg-transparent outline-none py-2">
                <option value="recent">Most recent</option>
                <option value="ending">Ending soon</option>
                <option value="goal">Highest goal</option>
                <option value="raised">Most raised</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredCampaigns.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-16">No campaigns match your filters.</p>
        ) : (
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCampaigns.map((c, idx) => {
              const goal = Number(c.goalAmount || 0);
              const raised = Number(c.raisedAmount || 0);
              const pct = goal > 0 ? Math.min(Math.round((raised/goal)*100), 100) : 0;
              const ends = c.endDate ? new Date(c.endDate).toLocaleDateString() : '—';
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
                >
                  {/* Top banner */}
                  <div className="relative h-44 w-full bg-gradient-to-r from-blue-200 to-indigo-200">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/20" />
                    <div className="absolute inset-0 flex items-center justify-center text-blue-700 font-semibold text-3xl">
                      {c.title.substring(0, 2).toUpperCase()}
                    </div>
                    {c.status === 'ACTIVE' && (
                      <span className="absolute top-3 left-3 px-2 py-1 text-xs rounded-full bg-green-600 text-white">Active</span>
                    )}
                    {c.status === 'COMPLETED' && (
                      <span className="absolute top-3 left-3 px-2 py-1 text-xs rounded-full bg-gray-700 text-white">Completed</span>
                    )}
                    {c.status === 'DRAFT' && (
                      <span className="absolute top-3 left-3 px-2 py-1 text-xs rounded-full bg-yellow-500 text-white">Draft</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-1 line-clamp-1">{c.title}</h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{c.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>₹{raised.toLocaleString('en-IN')}</span>
                        <span>Goal: ₹{goal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} className={`h-full ${pct >= 100 ? 'bg-green-600' : 'bg-blue-600'}`} />
                      </div>
                      <div className="mt-1 text-[11px] text-gray-500">{pct}% funded</div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between text-sm text-gray-500 mb-5">
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" /> {c.status}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" /> {c.totalDonors || 0} Backers
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {ends}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link to={`/campaigns/${c.id}`} className="inline-block flex-1 text-center bg-gradient-to-r from-brand-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-95 transition">
                        View Details
                      </Link>
                      {c.status === "DRAFT" && (
                        <button onClick={() => handleStart(c.id)} className="inline-flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
                          <Flame className="w-4 h-4" /> Start
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
