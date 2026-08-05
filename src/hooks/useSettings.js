import { useQuery } from '@tanstack/react-query'
import { settingsApi } from '@/api/settings.api'
import { QUERY_KEYS } from '@/constants'

export function useSettings() {
  return useQuery({
    queryKey: QUERY_KEYS.settings,
    queryFn: async () => {
      const res = await settingsApi.get()
      return res.data
    },
    staleTime: 1000 * 60 * 10, // 10 min — settings rarely change
  })
}