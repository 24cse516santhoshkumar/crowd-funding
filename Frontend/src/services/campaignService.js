import api from "../api/api";

export const startCampaign = async (id) => {
  try {
    const response = await api.put(`/api/campaigns/${id}/start`);
    return response.data;
  } catch (error) {
    console.error('Error starting campaign:', error);
    throw error;
  }
};
