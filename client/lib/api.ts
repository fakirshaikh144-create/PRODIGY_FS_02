import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const client = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

client.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const api = {
  auth: {
    login: (email: string, password: string) =>
      client.post('/auth/login', { email, password }),
    logout: () => client.post('/auth/logout'),
    getMe: () => client.get('/auth/me')
  },
  employees: {
    list: (page = 1, limit = 10, search = '', department = '', status = '') =>
      client.get('/employees', { params: { page, limit, search, department, status } }),
    get: (id: string) => client.get(`/employees/${id}`),
    create: (data: any) => client.post('/employees', data),
    update: (id: string, data: any) => client.put(`/employees/${id}`, data),
    delete: (id: string) => client.delete(`/employees/${id}`)
  },
  dashboard: {
    stats: () => client.get('/dashboard/stats')
  }
};
