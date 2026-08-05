import { useQuery } from '@tanstack/react-query'
import { certificatesApi } from '@/api/certificates.api'

export function useCertificates() {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const res = await certificatesApi.getAll({ limit: 20 })
      return res.data
    },
    staleTime: 1000 * 60 * 10,
  })
}