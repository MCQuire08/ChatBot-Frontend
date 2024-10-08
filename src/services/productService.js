import api from '../utils/api.js';
import { API_ROUTES } from '../utils/apiRoutes.js';

export const getAllProducts = async () => {
  try {
    const response = await api.get(API_ROUTES.products, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (name, description, price, category, stock) => {
  try {
    const response = await api.post(
      API_ROUTES.products,
      { name, description, price, category, stock },
      {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`${API_ROUTES.products}/${id}`, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
