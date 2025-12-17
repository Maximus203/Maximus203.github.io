import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 hover:border-gray-200 dark:hover:border-slate-600 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 flex flex-col h-full overflow-hidden"
    >
      {/* Project Image */}
      {project.image && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-2xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors">
              <ArrowUpRight className="text-gray-400 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" size={24} />
          </div>
          <div className="flex gap-2">
             {project.github && (
                 <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">
                     <Github size={20} />
                 </a>
             )}
             {project.link && (
                 <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">
                     <ExternalLink size={20} />
                 </a>
             )}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full border border-gray-200 dark:border-slate-600 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;