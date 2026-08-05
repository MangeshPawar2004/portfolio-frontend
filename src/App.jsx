import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import PageWrapper    from '@/components/layout/PageWrapper'
import Home           from '@/pages/Home'
import ProjectDetail  from '@/pages/ProjectDetail'
import NotFound       from '@/pages/NotFound'
import { ThemeProvider } from '@/context/ThemeContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <PageWrapper>
            <Routes>
              <Route path="/"                  element={<Home />} />
              <Route path="/projects/:slug"    element={<ProjectDetail />} />
              <Route path="*"                  element={<NotFound />} />
            </Routes>
          </PageWrapper>

          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: '#111111',
                border: '1px solid #242424',
                color: '#F5F5F5',
                borderRadius: '10px',
              },
            }}
          />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}