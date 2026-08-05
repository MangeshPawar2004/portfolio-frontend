import { useQuery } from '@tanstack/react-query'
import { experienceApi } from '@/api/experience.api'

export function useExperience() {
  return useQuery({
    queryKey: ['experience'],
    queryFn: async () => {
      const res = await experienceApi.getAll({ limit: 20, sortBy: 'startDate', order: 'desc' })
      return res.data
    },
    staleTime: 1000 * 60 * 10,
  })
}