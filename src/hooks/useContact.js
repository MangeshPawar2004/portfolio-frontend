import { useMutation } from '@tanstack/react-query'
import { contactApi } from '@/api/contact.api'
import { toast } from 'sonner'

export function useContact() {
  return useMutation({
    mutationFn: contactApi.submit,
    onSuccess: () => {
      toast.success("Message sent!", {
        description: "I'll get back to you within 24 hours.",
      })
    },
    onError: (error) => {
      toast.error("Failed to send message", {
        description: error.message || "Please try again or email me directly.",
      })
    },
  })
}