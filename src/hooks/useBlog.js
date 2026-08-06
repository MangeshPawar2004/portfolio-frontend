import { useQuery } from '@tanstack/react-query'
import { blogApi } from '@/api/blog.api'

export function useBlogPosts(params = {}) {
    return useQuery({
        queryKey: ['blog', params],
        queryFn: async () => {
            const res = await blogApi.getAll({ limit: 10, ...params })
            return res.data
        },
        staleTime: 1000 * 60 * 5,
    })
}

export function useBlogPost(slug) {
    return useQuery({
        queryKey: ['blog', slug],
        queryFn: async () => {
            const res = await blogApi.getBySlug(slug)
            return res.data
        },
        enabled: !!slug,
    })
}