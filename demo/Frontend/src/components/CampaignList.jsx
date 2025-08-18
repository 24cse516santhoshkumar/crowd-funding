import React, { useEffect, useState } from "react";
import { startCampaign } from "../services/campaignService";
import api from "../api/api";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    api
      .get("/campaigns", { params: { page: 0, size: 50, sortBy: "id" } })
      .then((res) => {
        const content = res.data?.content ?? res.data; // support both pageable and array
        setCampaigns(content);
      });
  }, []);

  const handleStart = async (id) => {
    try {
      const updatedCampaign = await startCampaign(id);
      setCampaigns((prev) =>
        prev.map((c) => (c.id === id ? updatedCampaign : c))
      );
      alert("Campaign started successfully!");
    } catch (error) {
      alert("Failed to start campaign: " + error.response?.data?.message);
    }
  };

  const getStatus = (campaign) => {
    const today = new Date().toISOString().split("T")[0];
    if (campaign.endDate && campaign.endDate < today) {
      return "EXPIRED";
    }
    return campaign.status;
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {campaigns.map((campaign) => {
        const progress =
          (campaign.raisedAmount / campaign.goalAmount) * 100 || 0;
        const status = getStatus(campaign);

        return (
          <div
            key={campaign.id}
            className="bg-white shadow-lg rounded-2xl p-5 border"
          >
            <h2 className="text-xl font-bold">{campaign.title}</h2>
            <p className="text-gray-600">{campaign.description}</p>

            {/* Status */}
            <p className="mt-2">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`${
                  status === "ACTIVE"
                    ? "text-green-600"
                    : status === "DRAFT"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {status}
              </span>
            </p>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">
                ₹{campaign.raisedAmount} raised of ₹{campaign.goalAmount}
              </p>
            </div>

            {/* Start Button */}
            {status === "DRAFT" && (
              <button
                onClick={() => handleStart(campaign.id)}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Start Campaign
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CampaignList;
