export const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
]

export const SOCIAL_LINKS = {
  github:   'https://github.com/MangeshPawar2004',
  linkedin: 'https://linkedin.com/in/mangesh-pawar-160324256',
  email:    'mailto:mangeshpawarmrp2004@gmail.com',
}

export const TECH_CATEGORIES = [
  'All',
  'frontend',
  'backend',
  'database',
  'devops',
  'tool',
  'other',
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
}