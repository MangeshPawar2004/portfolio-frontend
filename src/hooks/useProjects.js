import { useQuery } from '@tanstack/react-query'
import { projectsApi } from '@/api/projects.api'
import { QUERY_KEYS } from '@/constants'

export function useProjects(params = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.projects, params],
    queryFn: async () => {
      const res = await projectsApi.getAll(params)
      return res.data
    },
    staleTime: 1000 * 60 * 5,
  })
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: QUERY_KEYS.featured,
    queryFn: async () => {
      const res = await projectsApi.getFeatured()
      return res.data
    },
    staleTime: 1000 * 60 * 5,
  })
}

export function useProject(slug) {
  return useQuery({
    queryKey: QUERY_KEYS.project(slug),
    queryFn: async () => {
      const res = await projectsApi.getBySlug(slug)
      return res.data
    },
    enabled: !!slug,
  })
}