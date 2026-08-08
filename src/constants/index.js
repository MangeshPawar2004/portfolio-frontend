export const NAV_LINKS = [
  { label: 'About',      href: '/about' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Skills',     href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Blog',       href: '/blog' },
  { label: 'Contact',    href: '/contact' },
]

export const SOCIAL_LINKS = {
  github:   'https://github.com/MangeshPawar2004',
  linkedin: 'https://linkedin.com/in/mangesh-pawar-160324256',
  email:    'mailto:mangesh@example.com',
}

export const TECH_CATEGORIES = [
  'All', 'frontend', 'backend', 'database', 'devops', 'language', 'tools', 'other',
]

export const PROJECT_STATUS_COLORS = {
  completed: { bg: '#0d2e1f', text: '#10B981', border: '#1a4d35' },
  ongoing:   { bg: '#1a2e4a', text: '#3B82F6', border: '#1e3a5f' },
  planned:   { bg: '#2d1f3d', text: '#8B5CF6', border: '#3d2b54' },
}

export const QUERY_KEYS = {
  settings:     ['settings'],
  projects:     ['projects'],
  project:      (slug) => ['project', slug],
  featured:     ['projects', 'featured'],
  skills:       ['skills'],
  experience:   ['experience'],
  education:    ['education'],
  certificates: ['certificates'],
  blog:         ['blog'],
  blogPost:     (slug) => ['blog', slug],
}

// AI/ML tech names — used for visual treatment in Skills section
export const AI_TECH_NAMES = [
  'langchain', 'faiss', 'python', 'tensorflow', 'pytorch', 'openai',
  'huggingface', 'scikit-learn', 'sklearn', 'transformers', 'llm',
  'langchain', 'vectordb', 'chroma', 'pinecone', 'rag', 'llama',
  'gpt', 'gemini', 'claude', 'pandas', 'numpy', 'jupyter',
]

// Command palette static navigation commands
export const PALETTE_NAV_COMMANDS = [
  { id: 'home',       label: 'Go to Home',       icon: '🏠', action: 'navigate', href: '/' },
  { id: 'about',      label: 'Go to About',      icon: '👤', action: 'navigate', href: '/about' },
  { id: 'projects',   label: 'Go to Projects',   icon: '🗂️', action: 'navigate', href: '/projects' },
  { id: 'skills',     label: 'Go to Skills',     icon: '🛠️', action: 'navigate', href: '/skills' },
  { id: 'experience', label: 'Go to Experience', icon: '💼', action: 'navigate', href: '/experience' },
  { id: 'blog',       label: 'Go to Blog',       icon: '📝', action: 'navigate', href: '/blog' },
  { id: 'contact',    label: 'Go to Contact',    icon: '✉️', action: 'navigate', href: '/contact' },
]

export const PALETTE_LINK_COMMANDS = [
  { id: 'github',   label: 'Open GitHub',   icon: '⭐', action: 'link', href: 'https://github.com/MangeshPawar2004' },
  { id: 'linkedin', label: 'Open LinkedIn', icon: '💼', action: 'link', href: 'https://linkedin.com/in/mangesh-pawar-160324256' },
  { id: 'resume',   label: 'Download Resume', icon: '📄', action: 'resume' },
]