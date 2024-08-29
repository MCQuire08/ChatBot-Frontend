import axios from 'axios';
import { API_ROUTES } from '../utils/apiRoutes.js';

export const loginUser = async (email,password) => {
    try {
      const response = await axios.post(
        API_ROUTES.auth,
        {
          email,
          password,
        },
        {
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          }
        }
      );
  
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };