import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { makeDonation } from "../services/donationService";

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

  if (!campaign) {
    return <p>Loading campaign details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
      <p className="text-gray-700 mb-4">{campaign.description}</p>
      <div className="space-y-1 text-sm text-gray-600">
        <p>Goal: ₹{campaign.goalAmount}</p>
        <p>Raised: ₹{campaign.raisedAmount}</p>
        <p>Status: {campaign.status}</p>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setShowDonationForm(!showDonationForm)}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Donate
        </button>
        {isLoggedIn && (
          <button
            onClick={async () => {
              if (!confirm('Delete this campaign?')) return;
              setDeleting(true);
              try {
                await api.delete(`/api/campaigns/${id}`);
                alert('Campaign deleted');
                navigate('/campaigns');
              } catch (err) {
                const status = err?.response?.status;
                if (status === 401 || status === 403) {
                  alert('Please log in to delete this campaign');
                } else {
                  alert('Failed to delete');
                }
                console.error('Delete error:', err);
              } finally {
                setDeleting(false);
              }
            }}
            disabled={deleting}
            className="px-4 py-2 rounded bg-accent-500 text-white hover:bg-accent-600 disabled:opacity-60"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>

      {showDonationForm && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Make a Donation</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter amount"
                required
              />
            </div>
            {/* Removed name field */}
            <button
              onClick={async () => {
                if (!donationAmount) {
                  alert("Please fill all fields");
                  return;
                }
                setDonating(true);
                try {
                  await makeDonation(id, donationAmount);
                  alert("Thank you for your donation!");
                  // Refresh campaign data to show updated amount
                  const res = await api.get(`/api/campaigns/${id}`);
                  setCampaign(res.data);
                  setDonationAmount("");
                  setShowDonationForm(false);
                } catch (err) {
                  console.error(err);
                  alert("Failed to process donation");
                } finally {
                  setDonating(false);
                }
              }}
              disabled={donating}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {donating ? "Processing..." : "Complete Donation"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CampaignDetails;
