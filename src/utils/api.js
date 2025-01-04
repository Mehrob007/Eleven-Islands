
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://backendeleven.ru/Api/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
});

export default apiClient;
