import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import PageWrapper from '@/components/layout/PageWrapper'
import Home from '@/pages/Home'
import AboutPage from '@/pages/AboutPage'
import ProjectsPage from '@/pages/ProjectsPage'
import ProjectDetail from '@/pages/ProjectDetail'
import SkillsPage from '@/pages/SkillsPage'
import ExperiencePage from '@/pages/ExperiencePage'
import BlogList from '@/pages/BlogList'
import BlogDetail from '@/pages/BlogDetail'
import ContactPage from '@/pages/ContactPage'
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

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <PageWrapper>
      <ScrollToTop />
      <PageTransition>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<ContactPage />} />
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