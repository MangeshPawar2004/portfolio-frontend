import api from './axios'

export const educationApi = {
  getAll: (params = {}) => api.get('/education', { params }),
}