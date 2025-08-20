import api from "../api/api";

export const makeDonation = async (campaignId, amount) => {
  const response = await api.post(`/api/donations`, {
    campaign: { id: campaignId },
    amount: parseFloat(amount),
    date: new Date().toISOString().split('T')[0]
  });
  return response.data;
};

export const getUserDonations = async (page = 0, size = 50) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await api.get(`/api/donations/my-donations?page=${page}&size=${size}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching user donations:', error);
    if (error.response?.status === 401) {
      throw new Error('Authentication failed. Please login again.');
    } else if (error.response?.status === 403) {
      throw new Error('Access denied. You do not have permission to view donations.');
    } else if (error.response?.status === 404) {
      throw new Error('Donations endpoint not found.');
    } else {
      throw new Error(`Failed to fetch donations: ${error.message}`);
    }
  }
};

export const getAllDonations = async (page = 0, size = 10) => {
  try {
    const response = await api.get(`/api/donations?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all donations:', error);
    throw new Error(`Failed to fetch donations: ${error.message}`);
  }
};