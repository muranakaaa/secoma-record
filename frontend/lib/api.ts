import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/shops';

export const getShops = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching shops:', error);
    throw error;
  }
};
