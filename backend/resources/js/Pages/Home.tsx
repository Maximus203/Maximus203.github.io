import ExperienceItem from '@/Components/ExperienceItem';
import Footer from '@/Components/Footer';
import ProjectCard from '@/Components/ProjectCard';
import ProjectRequestModal from '@/Components/ProjectRequestModal';
import StickySidebar from '@/Components/StickySidebar';
import TerminalBlock from '@/Components/TerminalBlock';
import { PageProps, Project } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Briefcase,
    ChevronRight,
    Code2,
    FolderGit2,
    GraduationCap,
    Home as HomeIcon,
    Image as ImageIcon,
    Menu,
    Moon,
    Plus,
    Search,
    Sun,
    User,
    Wrench,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface HomeProps extends PageProps {
    projects: Project[];
    profile: {
        name: string;
        role: string;
        location: string;
        email: string;
        phone: string;
        linkedin: string;
        github: string;
        avatar: string;
        bioShort: string;
    };
    experience: Array<{
        id: number;
        company: string;
        role: string;
        period: string;
        description: string[];
    }>;
    skills: Array<{
        name: string;
        skills: Array<{ name: string; icon: string }>;
    }>;
    education: Array<{
        id: number;
        degree: string;
        school: string;
        period: string;
        description?: string;
    }>;
    labels: Record<string, string>;
}

export default function Home({ projects, profile, experience, skills, education, labels }: HomeProps) {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isProjectModalOpen, setProjectModalOpen] = useState(false);
    const [projectSearch, setProjectSearch] = useState('');

    const filteredProjects = projects.filter(proj => {
        const query = projectSearch.toLowerCase();
        const title = typeof proj.title === 'string' ? proj.title : proj.title.fr;
        const description = typeof proj.description === 'string' ? proj.description : proj.description.fr;
        return (
            title.toLowerCase().includes(query) ||
            description.toLowerCase().includes(query) ||
            proj.tags.some(tag => tag.toLowerCase().includes(query))
        );
    });

    // Apply theme (par défaut: dark)
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
        setTheme(savedTheme);
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const navItems = [
        { id: 'about', label: labels.about, icon: <User size={18} /> },
        { id: 'experience', label: labels.experience, icon: <Briefcase size={18} /> },
        { id: 'projects', label: labels.projects, icon: <FolderGit2 size={18} /> },
        { id: 'skills', label: labels.skills, icon: <Code2 size={18} /> },
    ];

    const handleNavClick = (target: string) => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    };

    const menuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
        },
        open: {
            opacity: 1,
            height: 'auto',
            transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }
        }
    };

    const menuItemVariants = {
        closed: { x: -20, opacity: 0 },
        open: (i: number) => ({
            x: 0,
            opacity: 1,
            transition: { delay: i * 0.05 + 0.1, duration: 0.3 }
        })
    };

    return (
        <>
            <Head>
                <title>{labels.seoHomeTitle}</title>
                <meta name="description" content={labels.seoHomeDesc} />
            </Head>

            <ProjectRequestModal
                isOpen={isProjectModalOpen}
                onClose={() => setProjectModalOpen(false)}
                labels={labels}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="min-h-screen bg-[#fafafa] dark:bg-slate-950 font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300 text-gray-900 dark:text-gray-50 flex flex-col"
            >
                {/* Mobile Navigation Bar */}
                <nav className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg z-50 border-b border-gray-100 dark:border-slate-800 lg:hidden px-4 py-3 flex justify-between items-center transition-colors duration-300">
                    <Link
                        href="/"
                        className="font-bold text-lg tracking-tight text-gray-900 dark:text-white cursor-pointer flex items-center gap-2"
                    >
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                            <Code2 size={18} />
                        </div>
                        <span>Cherif.<span className="text-indigo-600 dark:text-indigo-400">Dev</span></span>
                    </Link>

                    <button
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-gray-100 dark:border-slate-700"
                        aria-label="Toggle menu"
                    >
                        <motion.div
                            initial={false}
                            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.div>
                    </button>
                </nav>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileMenuOpen(false)}
                                className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                            />

                            <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={menuVariants}
                                className="fixed top-[64px] left-0 right-0 bg-white dark:bg-slate-900 z-40 lg:hidden border-b border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden rounded-b-3xl"
                            >
                                <div className="flex flex-col p-4 pb-6 space-y-1">
                                    <motion.button
                                        custom={0}
                                        variants={menuItemVariants}
                                        onClick={() => handleNavClick('about')}
                                        className="flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                                    >
                                        <HomeIcon size={18} />
                                        {labels.home}
                                        <ChevronRight size={16} className="ml-auto opacity-50" />
                                    </motion.button>

                                    {navItems.map((item, idx) => (
                                        <motion.button
                                            key={item.id}
                                            custom={idx + 1}
                                            variants={menuItemVariants}
                                            onClick={() => handleNavClick(item.id)}
                                            className="flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
                                        >
                                            {item.icon}
                                            {item.label}
                                        </motion.button>
                                    ))}

                                    <motion.div custom={5} variants={menuItemVariants}>
                                        <Link
                                            href="/galerie"
                                            className="flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
                                        >
                                            <ImageIcon size={18} />
                                            {labels.gallery}
                                        </Link>
                                    </motion.div>

                                    <motion.div custom={6} variants={menuItemVariants}>
                                        <Link
                                            href="/outils"
                                            className="flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
                                        >
                                            <Wrench size={18} />
                                            {labels.tools}
                                        </Link>
                                    </motion.div>

                                    <motion.div custom={7} variants={menuItemVariants} className="h-px bg-gray-100 dark:bg-slate-800 my-4" />

                                    <motion.div custom={8} variants={menuItemVariants} className="flex items-center justify-between px-2">
                                        <button
                                            onClick={toggleTheme}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs font-medium border border-gray-100 dark:border-slate-700"
                                        >
                                            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                                            <span>{theme === 'light' ? 'Mode Sombre' : 'Mode Clair'}</span>
                                        </button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <div className="max-w-7xl mx-auto px-6 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 flex-grow w-full">
                    {/* Left Column: Scrollable Content */}
                    <main className="lg:col-span-7 pt-16 lg:pt-0">
                        {/* Top Navigation for Desktop */}
                        <div className="hidden lg:flex items-center gap-6 mb-12 text-sm font-medium text-gray-500 dark:text-gray-400">
                            <button
                                onClick={() => handleNavClick('about')}
                                className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400"
                            >
                                <HomeIcon size={16} />
                                {labels.home}
                            </button>
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}
                            <Link
                                href="/galerie"
                                className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                            >
                                <ImageIcon size={16} />
                                {labels.gallery}
                            </Link>
                            <Link
                                href="/outils"
                                className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                            >
                                <Wrench size={16} />
                                {labels.tools}
                            </Link>
                        </div>

                        <div className="space-y-24">
                            {/* Header / Intro */}
                            <section id="about" className="space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                        </span>
                                        {labels.available}
                                    </div>
                                    <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                                        {labels.role} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Full-Stack</span>
                                        <br />{labels.and} {labels.mentor}.
                                    </h1>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                                        {profile.bioShort}
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <TerminalBlock title="cherif@dev:~/profile" className="border-gray-800 dark:border-slate-700">
                                        <div className="space-y-2">
                                            <p><span className="text-purple-400">const</span> <span className="text-yellow-200">user</span> = <span className="text-blue-300">{`{`}</span></p>
                                            <p className="pl-4"><span className="text-red-300">name</span>: <span className="text-green-400">"{profile.name}"</span>,</p>
                                            <p className="pl-4"><span className="text-red-300">role</span>: <span className="text-green-400">"{profile.role}"</span>,</p>
                                            <p className="pl-4"><span className="text-red-300">stack</span>: <span className="text-blue-300">[</span><span className="text-green-400">"Laravel"</span>, <span className="text-green-400">"React"</span>, <span className="text-green-400">"Docker"</span><span className="text-blue-300">]</span>,</p>
                                            <p className="pl-4"><span className="text-red-300">location</span>: <span className="text-green-400">"{profile.location}"</span></p>
                                            <p><span className="text-blue-300">{`}`}</span>;</p>
                                            <p className="mt-4 animate-pulse">_</p>
                                        </div>
                                    </TerminalBlock>
                                </motion.div>
                            </section>

                            {/* Experience Section */}
                            <section id="experience">
                                <div className="flex items-center gap-3 mb-8">
                                    <Briefcase className="text-indigo-600 dark:text-indigo-400" />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{labels.workExperience}</h2>
                                </div>
                                <div className="space-y-2">
                                    {experience.map((exp, index) => (
                                        <ExperienceItem
                                            key={exp.id}
                                            exp={exp}
                                            index={index}
                                            isLast={index === experience.length - 1}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* Projects Section */}
                            <section id="projects">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <FolderGit2 className="text-indigo-600 dark:text-indigo-400" />
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap">{labels.selectedProjects}</h2>
                                        </div>

                                        <button
                                            onClick={() => setProjectModalOpen(true)}
                                            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all shadow-md hover:shadow-lg shadow-indigo-200 dark:shadow-none transform hover:-translate-y-0.5 whitespace-nowrap"
                                        >
                                            <Plus size={18} />
                                            {labels.startProject}
                                        </button>

                                        <button
                                            onClick={() => setProjectModalOpen(true)}
                                            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:scale-105"
                                            aria-label={labels.startProject}
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>

                                    <div className="relative group w-full sm:w-72">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder={labels.searchPlaceholder}
                                            value={projectSearch}
                                            onChange={(e) => setProjectSearch(e.target.value)}
                                            className="block w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900/30 outline-none transition-all text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm"
                                        />
                                        {projectSearch && (
                                            <button
                                                onClick={() => setProjectSearch('')}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                            >
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredProjects.length > 0 ? (
                                        filteredProjects.map((proj, index) => (
                                            <ProjectCard key={proj.id} project={proj} index={index} />
                                        ))
                                    ) : (
                                        <div className="col-span-1 md:col-span-2 py-12 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-slate-700">
                                            <p>Aucun projet trouvé pour "{projectSearch}"</p>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Skills Section */}
                            <section id="skills">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <Code2 className="text-indigo-600 dark:text-indigo-400" />
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{labels.technicalSkills}</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {skills.map((category, idx) => (
                                            <div key={idx} className="space-y-4">
                                                <h3 className="font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-sm pl-1">{category.name}</h3>
                                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                                        {category.skills.map((skill, sIdx) => (
                                                            <div key={sIdx} className="flex flex-col items-center gap-3 group">
                                                                <div className="relative p-2 rounded-2xl bg-gray-50 dark:bg-slate-700/50 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors duration-300">
                                                                    {skill.icon ? (
                                                                        <img
                                                                            src={skill.icon}
                                                                            alt={skill.name}
                                                                            className="w-10 h-10 object-contain transform group-hover:scale-110 transition-transform duration-300"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                                                    )}
                                                                </div>
                                                                <span className="text-xs font-medium text-gray-600 dark:text-gray-300 text-center group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{skill.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </section>

                            {/* Education Section */}
                            <section id="education">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <GraduationCap className="text-indigo-600 dark:text-indigo-400" />
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{labels.educationTitle}</h2>
                                    </div>
                                    <div className="space-y-6">
                                        {education.map((edu) => (
                                            <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 pb-6 border-b border-gray-100 dark:border-slate-800 last:border-0">
                                                <span className="font-mono text-sm text-indigo-600 dark:text-indigo-400 font-semibold min-w-[120px]">{edu.period}</span>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-white">{edu.degree}</h4>
                                                    <p className="text-gray-600 dark:text-gray-400">{edu.school}</p>
                                                    {edu.description && <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 italic">{edu.description}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </section>
                        </div>
                    </main>

                    {/* Right Column: Sticky Sidebar */}
                    <aside className="hidden lg:block lg:col-span-5 relative">
                        <div className="sticky top-8 pl-8 max-h-[calc(100vh-2rem)] overflow-y-auto hide-scrollbar pb-4">
                            <div className="flex justify-end mb-6 gap-3">
                                <button
                                    onClick={toggleTheme}
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                                    title="Toggle Theme"
                                >
                                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                                </button>
                            </div>
                            <StickySidebar data={profile} labels={labels} />
                        </div>
                    </aside>
                </div>

                {/* Footer */}
                <Footer
                    data={profile}
                    labels={labels}
                    onNavClick={handleNavClick}
                    onToolLaunch={(id) => console.log('Tool:', id)}
                />
            </motion.div>
        </>
    );
}
