import api from './axios'

export const settingsApi = {
  get: () => api.get('/settings'),
}