import api from './axios'

export const experienceApi = {
  getAll: (params = {}) => api.get('/experience', { params }),
}