import axios from 'axios';

const API_URL = 'https://fakeapi.platzi.com/en/rest/products/';

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
