// src/pages/CampaignsPage.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader2, Target, Users, Clock } from "lucide-react";
import api from "../api/api";
import { startCampaign } from "../services/campaignService";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

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
      
      // Show success message with more details
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md';
      successMessage.innerHTML = `
        <div class="flex items-center">
          <div class="py-1"><svg class="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div>
            <p class="font-bold">Success!</p>
            <p class="text-sm">Campaign has been started successfully.</p>
          </div>
        </div>
      `;
      document.body.appendChild(successMessage);
      
      // Remove the message after 3 seconds
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);
      
    } catch (err) {
      console.error('Error in handleStart:', err);
      
      // Show error message with more details
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md';
      errorMessage.innerHTML = `
        <div class="flex items-center">
          <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div>
            <p class="font-bold">Error!</p>
            <p class="text-sm">Failed to start campaign. Please try again.</p>
          </div>
        </div>
      `;
      document.body.appendChild(errorMessage);
      
      // Remove the message after 3 seconds
      setTimeout(() => {
        document.body.removeChild(errorMessage);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* background image */}
      <img
        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=60"
        alt="Ideas planning and campaign strategy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-white/85" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Explore <span className="text-blue-600">Campaigns</span>
        </h1>

        {campaigns.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No campaigns found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {campaigns.map((c, idx) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
              >
                {/* Image placeholder */}
                <div className="h-48 w-full bg-gradient-to-r from-blue-200 to-indigo-200 flex items-center justify-center text-blue-700 font-semibold">
                  {c.title.substring(0, 2).toUpperCase()}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{c.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{c.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>₹{c.raisedAmount}</span>
                      <span>Goal: ₹{c.goalAmount}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600"
                        style={{
                          width: `${Math.min(
                            (c.raisedAmount / c.goalAmount) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" /> {c.status}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {c.totalDonors || 0} Backers
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {c.endDate}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      to={`/campaigns/${c.id}`}
                      className="inline-block flex-1 text-center bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      View Details
                    </Link>
                    {c.status === "DRAFT" && (
                      <button
                        onClick={() => handleStart(c.id)}
                        className="inline-block px-3 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                      >
                        Start
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
