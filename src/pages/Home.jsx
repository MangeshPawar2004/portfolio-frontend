import Hero               from '@/components/sections/Hero'
import About              from '@/components/sections/About'
import ProjectsSection    from '@/components/sections/ProjectsSection'
import Skills             from '@/components/sections/Skills'
import ExperienceTimeline from '@/components/sections/ExperienceTimeline'
import Contact            from '@/components/sections/Contact'

// Section order rationale:
// Hero → About → Projects (strongest content first) →
// Skills → Experience → Contact
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProjectsSection />
      <Skills />
      <ExperienceTimeline />
      <Contact />
    </>
  )
}