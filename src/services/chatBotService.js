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

export const sendMessage = async (conversationId, content, sender) => {
  try {
    const response = await axios.post(
      API_ROUTES.messages,
      {
        conversationId,
        content,
        sender
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

export const cleanConversation = async (conversationId) => {
  try {
    const response = await axios.delete(
      API_ROUTES.conversations+'/clean',
      {
        conversationId
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
