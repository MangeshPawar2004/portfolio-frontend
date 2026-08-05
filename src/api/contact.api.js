import api from './axios'

export const contactApi = {
  submit: (data) => api.post('/contact', data),
}