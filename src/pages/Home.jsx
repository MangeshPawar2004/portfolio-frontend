import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import ProjectsSection from '@/components/sections/ProjectsSection'
import Skills from '@/components/sections/Skills'
import ExperienceTimeline from '@/components/sections/ExperienceTimeline'
import Achievements from '@/components/sections/Achievements'
import BlogSection from '@/components/sections/BlogSection'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProjectsSection />
      <Skills />
      <ExperienceTimeline />
      <Achievements />
      <BlogSection />
      <Contact />
    </>
  )
}