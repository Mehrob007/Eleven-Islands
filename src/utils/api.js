
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://elevenislands.ru/api/',
});

export default apiClient;