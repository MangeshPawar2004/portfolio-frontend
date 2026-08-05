import api from './axios'

export const projectsApi = {
  // Public
  getAll:    (params = {}) => api.get('/projects', { params }),
  getFeatured: ()           => api.get('/projects/featured'),
  getBySlug: (slug)         => api.get(`/projects/${slug}`),
}