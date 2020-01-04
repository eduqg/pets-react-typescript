import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test.adopets.app',
});


export default api;
