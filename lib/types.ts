export interface Profile {
  name: string
  title: string
  description: string
  bio: string
  email: string
  phone: string
  location: string
  image: string
  website: string
  social: {
    github?: string
    linkedin?: string
    youtube?: string
    twitter?: string
    instagram?: string
  }
  titles: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  year: string
  githubLink?: string
  liveLink?: string
  profiles: string[]
  featured: boolean
  complexity: 'beginner' | 'intermediate' | 'advanced'
  category: string
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  duration: string
  description: string
  skills: string[]
  profiles: string[]
  type: 'job' | 'training'
  location: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  period: string
  description: string
  profiles: string[]
  status: 'obtenu' | 'en-cours'
}

export interface Skill {
  name: string
  level: number
  category: string
}

export interface Certification {
  title: string
  date?: string
  provider: string
  profiles?: string[]
}

export interface CertificationGroup {
  id: string
  category: string
  certifications: Certification[]
}

export interface Language {
  name: string
  level: string
  flag: string
}

export interface Interest {
  name: string
  description: string
}

export interface SoftSkill {
  name: string
  description: string
  level: number
}

export interface Theme {
  name: string
  description: string
  primary: string
  default?: boolean
  gradient?: boolean
  monochrome?: boolean
  terminalStyle?: boolean
}

export interface PortfolioData {
  profile: Profile
  projects: Project[]
  experience: Experience[]
  education: Education[]
  skills: {
    frontend: Skill[]
    backend: Skill[]
    database: Skill[]
    tools: Skill[]
    other: Skill[]
  }
  certifications: CertificationGroup[]
  languages: Language[]
  interests: Interest[]
  softSkills: SoftSkill[]
  themes: {
    fullstack: Theme
    frontend: Theme
    backend: Theme
  }
}