import api from './axios'

export const blogApi = {
  getAll:    (params = {}) => api.get('/blog', { params }),
  getBySlug: (slug)         => api.get(`/blog/${slug}`),
  getFeatured: ()           => api.get('/blog?limit=3'),
}