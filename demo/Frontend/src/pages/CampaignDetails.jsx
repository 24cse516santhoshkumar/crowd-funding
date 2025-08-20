import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/api";
import { makeDonation } from "../services/donationService";
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, DollarSign, Goal, Heart, Share2, Sparkles, Trash2 } from "lucide-react";

function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [donating, setDonating] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  // donor name no longer required; donor is derived from auth when available
  const [showDonationForm, setShowDonationForm] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  useEffect(() => {
    api
      .get(`/api/campaigns/${id}`)
      .then((res) => setCampaign(res.data))
      .catch((err) => console.error("Error fetching campaign:", err));
  }, [id]);

  const goalAmount = useMemo(() => Number(campaign?.goalAmount || 0), [campaign]);
  const raisedAmount = useMemo(() => Number(campaign?.raisedAmount || 0), [campaign]);
  const progress = useMemo(() => {
    if (!goalAmount || goalAmount <= 0) return 0;
    return Math.max(0, Math.min(100, Math.round((raisedAmount / goalAmount) * 100)));
  }, [goalAmount, raisedAmount]);

  const daysLeft = useMemo(() => {
    if (!campaign?.endDate) return null;
    const end = new Date(campaign.endDate);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff < 0 ? 0 : diff;
  }, [campaign]);

  if (!campaign) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-3xl px-6">
          <div className="h-40 rounded-2xl bg-gradient-to-r from-brand-600/20 to-purple-600/20 animate-pulse" />
          <div className="mt-6 space-y-3">
            <div className="h-8 w-2/3 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="mt-6 h-28 bg-white rounded-2xl shadow animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero / Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-purple-600 opacity-10" />
        <div className="relative max-w-6xl mx-auto px-6 pt-12">
          <div className="flex items-center gap-3 text-sm text-brand-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <Link to="/campaigns" className="hover:underline">Back to campaigns</Link>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-brand-500 to-purple-500 rounded-xl text-white shadow-lg">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold gradient-text">{campaign.title}</h1>
              <div className="mt-1 inline-flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-full bg-white/80 text-gray-700 shadow">Status: {campaign.status}</span>
                {daysLeft !== null && <span className="px-2 py-0.5 rounded-full bg-white/80 text-gray-700 shadow">{daysLeft} days left</span>}
              </div>
            </div>
          </motion.div>
          <p className="mt-4 max-w-3xl text-gray-600">{campaign.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-600">Raised</div>
                <div className="text-sm text-gray-600">Goal</div>
              </div>
              <div className="flex items-center justify-between font-bold text-gray-900">
                <div className="text-2xl">₹{raisedAmount.toLocaleString('en-IN')}</div>
                <div>₹{goalAmount.toLocaleString('en-IN')}</div>
              </div>
              <div className="mt-4 h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} className="h-full bg-gradient-to-r from-brand-500 to-purple-500" />
              </div>
              <div className="mt-2 text-sm text-gray-600">{progress}% funded</div>
            </motion.div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-4 shadow flex items-center gap-3">
                <div className="p-3 rounded-full bg-blue-100"><DollarSign className="w-5 h-5 text-blue-600" /></div>
                <div>
                  <div className="text-xs text-gray-600">Goal</div>
                  <div className="text-lg font-semibold">₹{goalAmount.toLocaleString('en-IN')}</div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl p-4 shadow flex items-center gap-3">
                <div className="p-3 rounded-full bg-green-100"><Heart className="w-5 h-5 text-green-600" /></div>
                <div>
                  <div className="text-xs text-gray-600">Raised</div>
                  <div className="text-lg font-semibold">₹{raisedAmount.toLocaleString('en-IN')}</div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-4 shadow flex items-center gap-3">
                <div className="p-3 rounded-full bg-purple-100"><Calendar className="w-5 h-5 text-purple-600" /></div>
                <div>
                  <div className="text-xs text-gray-600">Ends</div>
                  <div className="text-lg font-semibold">{campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'N/A'}</div>
                </div>
              </motion.div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => setShowDonationForm(true)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow hover:opacity-95 transition">
                <Heart className="w-4 h-4" /> Donate
              </button>
              <button onClick={() => navigator.share ? navigator.share({ title: campaign.title, text: campaign.description }) : toast.info('Share not supported on this browser.')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-700 shadow hover:bg-gray-50 transition">
                <Share2 className="w-4 h-4" /> Share
              </button>
              {isLoggedIn && (
                <button onClick={async () => {
                  if (!confirm('Delete this campaign?')) return;
                  setDeleting(true);
                  try {
                    await api.delete(`/api/campaigns/${id}`);
                    toast.success('Campaign deleted');
                    navigate('/campaigns');
                  } catch (err) {
                    const status = err?.response?.status;
                    if (status === 401 || status === 403) {
                      toast.error('Please log in to delete this campaign');
                    } else {
                      toast.error('Failed to delete');
                    }
                    console.error('Delete error:', err);
                  } finally {
                    setDeleting(false);
                  }
                }} disabled={deleting} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition">
                  <Trash2 className="w-4 h-4" /> {deleting ? 'Deleting...' : 'Delete'}
                </button>
              )}
            </div>
          </div>

          {/* Right: Donation Card */}
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow p-6">
                  <h3 className="text-xl font-bold mb-1">Support this campaign</h3>
                  <p className="text-sm text-gray-600 mb-4">Every contribution helps reach the goal faster.</p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                      <input type="number" min="1" step="0.01" value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Enter amount" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[100,500,1000,2500].map(val => (
                        <button key={val} onClick={() => setDonationAmount(String(val))} className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">₹{val.toLocaleString('en-IN')}</button>
                      ))}
                    </div>
                    <button onClick={async () => {
                      if (!donationAmount) {
                        toast.info('Please enter an amount');
                        return;
                      }
                      setDonating(true);
                      try {
                        await makeDonation(id, donationAmount);
                        toast.success("🎉 Thank you for your donation!", { position: "top-right" });
                        const res = await api.get(`/api/campaigns/${id}`);
                        setCampaign(res.data);
                        setDonationAmount("");
                        setShowDonationForm(false);
                        setTimeout(() => {
                          if (confirm("View your updated donations?")) navigate('/donations');
                        }, 600);
                      } catch (err) {
                        console.error(err);
                        toast.error("Failed to process donation. Please try again.");
                      } finally {
                        setDonating(false);
                      }
                    }} disabled={donating} className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white font-medium hover:opacity-95 transition disabled:opacity-60">
                      {donating ? "Processing..." : "Donate now"}
                    </button>
                    <p className="text-[11px] text-gray-500 text-center">Secure payment • 100% goes to the campaign</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;
