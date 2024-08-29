const API_BASE_URL = 'http://localhost:3030'; 

export const API_ROUTES = {
  conversations: `${API_BASE_URL}/chatBot/conversations`,
  messages:`${API_BASE_URL}/chatBot/messages`,
  responses:`${API_BASE_URL}/responses`,
  auth:`${API_BASE_URL}/login`
};
