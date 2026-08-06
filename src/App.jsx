import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import PageWrapper from '@/components/layout/PageWrapper'
import Home from '@/pages/Home'
import ProjectDetail from '@/pages/ProjectDetail'
import BlogDetail from '@/pages/BlogDetail'
import BlogList from '@/pages/BlogList'
import NotFound from '@/pages/NotFound'
import { ThemeProvider } from '@/context/ThemeContext'
import PageTransition from '@/components/animations/PageTransition'
import CommandPalette from '@/components/CommandPalette'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
})

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <PageWrapper>
      <PageTransition>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </PageWrapper>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          {/* Command palette lives outside router so it works on all pages */}
          <CommandPalette />

          <AnimatedRoutes />

          <Toaster
            position="bottom-right"
            theme="system"
            toastOptions={{
              style: {
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                borderRadius: '12px',
              },
            }}
          />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}