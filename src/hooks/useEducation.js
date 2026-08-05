import { useQuery } from '@tanstack/react-query'
import { educationApi } from '@/api/education.api'

export function useEducation() {
  return useQuery({
    queryKey: ['education'],
    queryFn: async () => {
      const res = await educationApi.getAll({ limit: 10 })
      return res.data
    },
    staleTime: 1000 * 60 * 10,
  })
}   