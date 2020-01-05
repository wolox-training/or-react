import { create } from 'apisauce';

const api = create({
  baseURL: 'http://localhost:3005',
  timeout: 8000
});

export default api;
