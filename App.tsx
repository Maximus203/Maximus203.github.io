import React, { useEffect } from 'react';
import { RESUME_DATA, UI_LABELS } from './constants';
import { Language } from './types';
import { useAppStore } from './store'; // Import global store
import { useSEO } from './hooks/useSEO'; // Import SEO hook
import StickySidebar from './components/StickySidebar';
import TerminalBlock from './components/TerminalBlock';
import ProjectCard from './components/ProjectCard';
import ExperienceItem from './components/ExperienceItem';
import GalleryGrid from './components/GalleryGrid';
import GalleryCarousel from './components/GalleryCarousel';
import ToolsGrid from './components/ToolsGrid';
import ReadmeGenerator from './components/ReadmeGenerator';
import ImageConverter from './components/ImageConverter';
import MemeGenerator from './components/MemeGenerator';
import IntroAnimation from './components/IntroAnimation';
import ProjectRequestModal from './components/ProjectRequestModal';
import Footer from './components/footer';
import { Briefcase, GraduationCap, Code2, FolderGit2, Menu, X, ArrowRight, Moon, Sun, Image as ImageIcon, Home, Wrench, User, ChevronRight, Search, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  // Use global store
  const {
    theme, toggleTheme,
    lang, setLang,
    view, setView,
    showIntro, setShowIntro,
    isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen,
    isProjectModalOpen, setProjectModalOpen,
    projectSearch, setProjectSearch
  } = useAppStore();

  // Initialize SEO hook
  useSEO();

  const data = RESUME_DATA[lang];
  const labels = UI_LABELS[lang];

  // Separate featured items for carousel vs grid
  const featuredGalleryItems = data.gallery.filter(item => item.featured);
  const gridGalleryItems = data.gallery.filter(item => !item.featured);

  const isFullWidthView = view === 'readme_generator' || view === 'converter' || view === 'meme' || view === 'gallery' || view === 'tools';

  const filteredProjects = data.projects.filter(project => {
    const query = projectSearch.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  // Apply theme class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleNavClick = (target: string, isViewChange: boolean = false) => {
    if (isViewChange) {
      if (target === 'gallery') {
        setView('gallery');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (target === 'tools') {
        setView('tools');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      if (view !== 'home') {
        setView('home');
        // Wait for render cycle then scroll
        setTimeout(() => {
          document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleToolLaunch = (toolId: string) => {
    if (toolId === 'readme') {
      setView('readme_generator');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (toolId === 'converter') {
      setView('converter');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (toolId === 'meme') {
      setView('meme');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'about', label: labels.about, icon: <User size={18} /> },
    { id: 'experience', label: labels.experience, icon: <Briefcase size={18} /> },
    { id: 'projects', label: labels.projects, icon: <FolderGit2 size={18} /> },
    { id: 'skills', label: labels.skills, icon: <Code2 size={18} /> },
  ];

  // Animation variants for mobile menu
  const menuVariants = {
    closed: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] as const }
    },
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] as const }
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
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroAnimation onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <ProjectRequestModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setProjectModalOpen(false)} 
        labels={labels}
      />

      {!showIntro && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1 }}
           className="min-h-screen bg-[#fafafa] dark:bg-slate-950 font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300 text-gray-900 dark:text-gray-50 flex flex-col"
        >
          {/* Mobile Navigation Bar */}
          <nav className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg z-50 border-b border-gray-100 dark:border-slate-800 lg:hidden px-4 py-3 flex justify-between items-center transition-colors duration-300">
            <span 
              className="font-bold text-lg tracking-tight text-gray-900 dark:text-white cursor-pointer flex items-center gap-2"
              onClick={() => handleNavClick('home', true)}
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                 <Code2 size={18} />
              </div>
              <span>Cherif.<span className="text-indigo-600 dark:text-indigo-400">Dev</span></span>
            </span>
            
            <button 
                onClick={toggleMobileMenu} 
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
                  {/* Backdrop */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                  />
                  
                  {/* Drawer */}
                  <motion.div 
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={menuVariants}
                      className="fixed top-[64px] left-0 right-0 bg-white dark:bg-slate-900 z-40 lg:hidden border-b border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden rounded-b-3xl"
                  >
                      <div className="flex flex-col p-4 pb-6 space-y-1">
                          
                          {/* Main Navigation */}
                          <motion.button 
                              custom={0}
                              variants={menuItemVariants}
                              onClick={() => handleNavClick('home', true)} 
                              className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium transition-all ${view === 'home' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                          >
                             <Home size={18} />
                             {labels.home}
                             {view === 'home' && <ChevronRight size={16} className="ml-auto opacity-50" />}
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

                          <motion.button 
                              custom={5}
                              variants={menuItemVariants}
                              onClick={() => handleNavClick('gallery', true)} 
                              className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium transition-all ${view === 'gallery' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                          >
                            <ImageIcon size={18} />
                            {labels.gallery}
                            {view === 'gallery' && <ChevronRight size={16} className="ml-auto opacity-50" />}
                          </motion.button>

                          <motion.button 
                              custom={6}
                              variants={menuItemVariants}
                              onClick={() => handleNavClick('tools', true)} 
                              className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium transition-all ${view === 'tools' || view === 'readme_generator' || view === 'converter' || view === 'meme' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                          >
                            <Wrench size={18} />
                            {labels.tools}
                            {(view === 'tools' || view === 'readme_generator' || view === 'converter' || view === 'meme') && <ChevronRight size={16} className="ml-auto opacity-50" />}
                          </motion.button>
                          
                          {/* Divider */}
                          <motion.div custom={7} variants={menuItemVariants} className="h-px bg-gray-100 dark:bg-slate-800 my-4" />
                          
                          {/* Settings (Lang & Theme) */}
                          <motion.div custom={8} variants={menuItemVariants} className="flex items-center justify-between px-2">
                              {/* Theme Toggle */}
                              <button 
                                 onClick={toggleTheme}
                                 className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs font-medium border border-gray-100 dark:border-slate-700"
                              >
                                 {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                                 <span>{theme === 'light' ? 'Mode Sombre' : 'Mode Clair'}</span>
                              </button>

                              {/* Lang Toggle */}
                              <div className="flex bg-gray-50 dark:bg-slate-800 rounded-lg p-1 border border-gray-100 dark:border-slate-700">
                                {(['fr', 'en', 'zh', 'ja'] as Language[]).map((l) => (
                                    <button 
                                        key={l}
                                        onClick={() => setLang(l)}
                                        className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${lang === l ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
                                    >
                                        {l.toUpperCase()}
                                    </button>
                                ))}
                              </div>
                          </motion.div>

                      </div>
                  </motion.div>
                </>
            )}
          </AnimatePresence>

          <div className="max-w-7xl mx-auto px-6 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 flex-grow w-full">
            
            {/* Left Column (or Full Width): Scrollable Content */}
            <main className={`${isFullWidthView ? 'lg:col-span-12' : 'lg:col-span-7'} pt-16 lg:pt-0`}>
              
              {/* Top Navigation for Desktop (Inline) */}
              <div className="hidden lg:flex items-center gap-6 mb-12 text-sm font-medium text-gray-500 dark:text-gray-400">
                 <button 
                    onClick={() => handleNavClick('home', true)} 
                    className={`flex items-center gap-2 transition-colors ${view === 'home' ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-gray-900 dark:hover:text-gray-200'}`}
                 >
                    <Home size={16} />
                    {labels.home}
                 </button>
                 {view === 'home' && navItems.map(item => (
                   <button 
                      key={item.id} 
                      onClick={() => handleNavClick(item.id)}
                      className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                   >
                      {item.label}
                   </button>
                 ))}
                 <button 
                    onClick={() => handleNavClick('gallery', true)}
                    className={`flex items-center gap-2 transition-colors ${view === 'gallery' ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-gray-900 dark:hover:text-gray-200'}`}
                 >
                    <ImageIcon size={16} />
                    {labels.gallery}
                 </button>
                 <button 
                    onClick={() => handleNavClick('tools', true)}
                    className={`flex items-center gap-2 transition-colors ${view === 'tools' || view === 'readme_generator' || view === 'converter' || view === 'meme' ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-gray-900 dark:hover:text-gray-200'}`}
                 >
                    <Wrench size={16} />
                    {labels.tools}
                 </button>
              </div>

              <AnimatePresence mode="wait">
                {view === 'home' ? (
                  <motion.div 
                    key="home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-24"
                  >
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
                            {data.profile.bioShort}
                          </p>
                      </motion.div>

                      {/* Terminal Intro */}
                      <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                      >
                          <TerminalBlock title="cherif@dev:~/profile" className="border-gray-800 dark:border-slate-700">
                              <div className="space-y-2">
                                  <p><span className="text-purple-400">const</span> <span className="text-yellow-200">user</span> = <span className="text-blue-300">{`{`}</span></p>
                                  <p className="pl-4"><span className="text-red-300">name</span>: <span className="text-green-400">"{data.profile.name}"</span>,</p>
                                  <p className="pl-4"><span className="text-red-300">role</span>: <span className="text-green-400">"{data.profile.role}"</span>,</p>
                                  <p className="pl-4"><span className="text-red-300">stack</span>: <span className="text-blue-300">[</span><span className="text-green-400">"Laravel"</span>, <span className="text-green-400">"React"</span>, <span className="text-green-400">"Docker"</span><span className="text-blue-300">]</span>,</p>
                                  <p className="pl-4"><span className="text-red-300">location</span>: <span className="text-green-400">"{data.profile.location}"</span></p>
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
                          {data.experience.map((exp, index) => (
                              <ExperienceItem 
                                  key={index} 
                                  exp={exp} 
                                  index={index} 
                                  isLast={index === data.experience.length - 1} 
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
                              
                              {/* Desktop Button (Text + Icon) - lg+ */}
                              <button 
                                onClick={() => setProjectModalOpen(true)}
                                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all shadow-md hover:shadow-lg shadow-indigo-200 dark:shadow-none transform hover:-translate-y-0.5 whitespace-nowrap"
                              >
                                <Plus size={18} />
                                {labels.startProject}
                              </button>
                              
                              {/* Mobile/Tablet Button (Icon only) - < lg */}
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
                                  <ProjectCard key={index} project={proj} index={index} />
                              ))
                          ) : (
                              <div className="col-span-1 md:col-span-2 py-12 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-slate-700">
                                  <p>No projects found matching "{projectSearch}"</p>
                              </div>
                          )}
                      </div>
                    </section>

                    {/* Skills Section - Refactored for Icons */}
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
                              {data.skills.map((category, idx) => (
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
                              {data.education.map((edu, idx) => (
                                  <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 pb-6 border-b border-gray-100 dark:border-slate-800 last:border-0">
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
                  </motion.div>
                ) : view === 'gallery' ? (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                     <div className="mb-8">
                       <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{labels.galleryTitle}</h1>
                       <p className="text-gray-600 dark:text-gray-400">{labels.gallerySubtitle}</p>
                     </div>
                     
                     {/* Carousel for Featured Items */}
                     <GalleryCarousel items={featuredGalleryItems} />

                     {/* Grid for other items */}
                     {gridGalleryItems.length > 0 && (
                       <>
                         <div className="flex items-center gap-2 mb-4 mt-12">
                           <h2 className="text-xl font-bold text-gray-900 dark:text-white">More moments</h2>
                           <div className="h-px bg-gray-200 dark:bg-slate-800 flex-grow" />
                         </div>
                         <GalleryGrid items={gridGalleryItems} />
                       </>
                     )}
                  </motion.div>
                ) : view === 'tools' ? (
                  <motion.div
                    key="tools"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                     <div className="mb-8">
                       <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{labels.toolsTitle}</h1>
                       <p className="text-gray-600 dark:text-gray-400">{labels.toolsSubtitle}</p>
                     </div>

                     <ToolsGrid labels={labels} onLaunch={handleToolLaunch} />
                  </motion.div>
                ) : view === 'converter' ? (
                    <ImageConverter onBack={() => setView('tools')} />
                ) : view === 'meme' ? (
                    <MemeGenerator onBack={() => setView('tools')} labels={labels} />
                ) : (
                   <ReadmeGenerator onBack={() => setView('tools')} />
                )}
              </AnimatePresence>

            </main>
            
            {/* Right Column: Sticky Sidebar - HIDDEN if isFullWidthView */}
            {!isFullWidthView && (
               <aside className="hidden lg:block lg:col-span-5 relative">
                  <div className="sticky top-8 pl-8 max-h-[calc(100vh-2rem)] overflow-y-auto hide-scrollbar pb-4">
                     {/* Language & Theme Toggle for Desktop */}
                     <div className="flex justify-end mb-6 gap-3">
                        <button 
                           onClick={toggleTheme}
                           className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                           title="Toggle Theme"
                        >
                           {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                        <div className="flex bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm border border-gray-100 dark:border-slate-700">
                           {(['fr', 'en', 'zh', 'ja'] as Language[]).map((l) => (
                               <button 
                                   key={l}
                                   onClick={() => setLang(l)} 
                                   className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${lang === l ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
                               >
                                   {l.toUpperCase()}
                               </button>
                           ))}
                        </div>
                     </div>
                     <StickySidebar data={data.profile} labels={labels} />
                  </div>
               </aside>
            )}

          </div>

          {/* Full Width Footer - Positioned Outside the Grid */}
          {(view === 'home' || view === 'gallery' || view === 'tools') && (
            <Footer data={data.profile} labels={labels} onNavClick={handleNavClick} onToolLaunch={handleToolLaunch} />
          )}

        </motion.div>
      )}
    </>
  );
};

export default App;