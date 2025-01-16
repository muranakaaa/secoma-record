import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/shops';

export const getShops = async (page: number, perPage: number) => {
  try {
    const response = await axios.get(`/api/v1/shops?page=${page}&per_page=${perPage}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shops:', error);
    throw error;
  }
};
