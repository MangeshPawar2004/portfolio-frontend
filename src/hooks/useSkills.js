import { useQuery } from '@tanstack/react-query'
import { skillsApi } from '@/api/skills.api'

export function useSkills(params = {}) {
  return useQuery({
    queryKey: ['skills', params],
    queryFn: async () => {
      const res = await skillsApi.getAll({ limit: 50, ...params })
      return res.data
    },
    staleTime: 1000 * 60 * 10,
  })
}