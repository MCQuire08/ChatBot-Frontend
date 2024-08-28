import axios from 'axios';
import { API_ROUTES } from '../utils/apiRoutes.js';

export const getAllResponses = async () => {
  try {
    const response = await axios.get(API_ROUTES.responses, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching responses:', error);
    throw error;
  }
};

export const createResponse = async (trigger, reply) => {
  try {
    const response = await axios.post(
      API_ROUTES.responses,
      { trigger, reply },
      {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating response:', error);
    throw error;
  }
};

export const deleteResponse = async (id) => {
  try {
    const response = await axios.delete(`${API_ROUTES.responses}/${id}`, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting response:', error);
    throw error;
  }
};
