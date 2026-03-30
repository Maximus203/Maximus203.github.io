'use client';

import { motion } from 'framer-motion';
import { Briefcase, Code2, FolderGit2, GraduationCap, Plus, Search, X } from 'lucide-react';
import ExperienceItem from '@/components/home/ExperienceItem';
import ProjectCard from '@/components/home/ProjectCard';
import TerminalBlock from '@/components/home/TerminalBlock';
import { useAppStore } from '@/store/store';
import { getLabels, getResumeData } from '@/lib/i18n';
import type { Language } from '@/types';

interface HomePageClientProps {
  lang: Language;
}

export default function HomePageClient({ lang }: HomePageClientProps) {
  const { isProjectModalOpen, setProjectModalOpen, projectSearch, setProjectSearch } = useAppStore();
  const data = getResumeData(lang);
  const labels = getLabels(lang);

  const filteredProjects = data.projects.filter((project) => {
    const query = projectSearch.toLowerCase();
    return project.title.toLowerCase().includes(query) || project.tags.some((tag) => tag.toLowerCase().includes(query));
  });

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-24"
    >
      {/* Header / Intro */}
      <section id="about" className="space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            {labels.available}
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6">
            {labels.role}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Full-Stack
            </span>
            <br />
            {labels.and} {labels.mentor}.
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">{data.profile.bioShort}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <TerminalBlock title="cherif@dev:~/profile" className="border-gray-800 dark:border-slate-700">
            <div className="space-y-2">
              <p>
                <span className="text-purple-400">const</span> <span className="text-yellow-200">user</span> ={' '}
                <span className="text-blue-300">{`{`}</span>
              </p>
              <p className="pl-4">
                <span className="text-red-300">name</span>: <span className="text-green-400">"{data.profile.name}"</span>,
              </p>
              <p className="pl-4">
                <span className="text-red-300">role</span>: <span className="text-green-400">"{data.profile.role}"</span>,
              </p>
              <p className="pl-4">
                <span className="text-red-300">stack</span>: <span className="text-blue-300">[</span>
                <span className="text-green-400">"Laravel"</span>, <span className="text-green-400">"React"</span>,{' '}
                <span className="text-green-400">"Docker"</span>
                <span className="text-blue-300">]</span>,
              </p>
              <p className="pl-4">
                <span className="text-red-300">location</span>: <span className="text-green-400">"{data.profile.location}"</span>
              </p>
              <p>
                <span className="text-blue-300">{`}`}</span>;
              </p>
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
            <ExperienceItem key={index} exp={exp} index={index} isLast={index === data.experience.length - 1} />
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
            filteredProjects.map((proj, index) => <ProjectCard key={index} project={proj} index={index} />)
          ) : (
            <div className="col-span-1 md:col-span-2 py-12 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-slate-700">
              <p>No projects found matching &quot;{projectSearch}&quot;</p>
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
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
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 text-center group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {skill.name}
                        </span>
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
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
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
  );
}
