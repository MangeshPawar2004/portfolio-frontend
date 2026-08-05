import api from './axios'

export const certificatesApi = {
  getAll: (params = {}) => api.get('/certificates', { params }),
}