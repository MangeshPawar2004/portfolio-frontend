import api from './axios'

export const skillsApi = {
  getAll: (params = {}) => api.get('/skills', { params }),
}