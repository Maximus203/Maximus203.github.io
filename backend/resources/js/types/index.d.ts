export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface ProjectSubmission {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    details: string;
    file_url: string | null;
    file_name: string | null;
    file_size: number | null;
    status: 'pending' | 'reviewed' | 'approved' | 'rejected';
    ip_address: string | null;
    user_agent: string | null;
    created_at: string;
    updated_at: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    github?: string;
    demo_url?: string;
    image: string;
    category: string;
    created_at: string;
}

export interface Experience {
    id: number;
    company: string;
    role: string;
    period: string;
    description: string[];
    location?: string;
    created_at: string;
}

export interface Certification {
    id: number;
    title: string;
    issuer: string;
    date: string;
    credential_url?: string;
    image?: string;
}

export interface Skill {
    id: number;
    name: string;
    category: string;
    level: number;
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
        avatar: string;
        bio: string;
    };
    experiences: Experience[];
    projects: Project[];
    certifications: Certification[];
    skills: Skill[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User | null;
    };
    ziggy: {
        location: string;
        previous?: string;
    };
};
