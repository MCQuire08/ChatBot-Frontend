import axios from 'axios';
import { API_ROUTES } from '../utils/apiRoutes.js';

export const getConversations = async (userId) => {
  try {
    const response = await axios.get(API_ROUTES.conversations, {
      params: { userId },
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};
