import api from "../api/api";

export const makeDonation = async (campaignId, amount) => {
  const response = await api.post(`/api/donations`, {
    campaign: { id: campaignId },
    amount: parseFloat(amount),
    date: new Date().toISOString().split('T')[0]
  });
  return response.data;
};