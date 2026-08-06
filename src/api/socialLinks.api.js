import api from './axios'

export const socialLinksApi = {
    getAll: () => api.get('/social-links'),
}