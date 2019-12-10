import { create } from 'apisauce';

const api = create({
  baseURL: 'http://localhost:3005',
  timeout: 5000
});

export default api;