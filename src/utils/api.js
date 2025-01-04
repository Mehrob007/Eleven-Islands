
import axios from 'axios';

const apiClient = axios.create({
<<<<<<< HEAD
  baseURL: 'https://backendeleven.ru/Api/',
=======
  baseURL: 'https://backendeleven.ru',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
>>>>>>> c57ca5eabdfca5a1101bc5c35845826743c33076
});

export default apiClient;
