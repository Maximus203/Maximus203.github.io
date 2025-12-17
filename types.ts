export type Language = 'fr' | 'en' | 'zh' | 'ja';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  location?: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  description?: string;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; icon?: string }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  size?: 'normal' | 'large';
  featured?: boolean;
}

export interface ResumeData {
  profile: {
    name: string;
    role: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    bio: string;
    bioShort: string;
    avatar?: string;
  };
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
  gallery: GalleryItem[];
}