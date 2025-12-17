import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '../types';

interface ExperienceItemProps {
  exp: Experience;
  isLast: boolean;
  index: number;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ exp, isLast, index }) => {
  return (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className="relative pl-8 md:pl-0"
    >
      <div className="md:grid md:grid-cols-12 md:gap-8 group">
        {/* Timeline Line (Desktop) */}
        <div className="hidden md:flex md:col-span-3 flex-col items-end text-right">
           <span className="text-sm font-mono font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full inline-block mb-2">
             {exp.period}
           </span>
           <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">{exp.company}</span>
        </div>

        {/* Timeline Dot & Line */}
        <div className="hidden md:flex md:col-span-1 justify-center relative">
           <div className="h-full w-px bg-gray-200 dark:bg-slate-700 group-last:bg-transparent absolute top-4" />
           <div className="w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-500 border-4 border-white dark:border-slate-900 shadow-sm z-10 relative mt-1.5" />
        </div>
        
        {/* Mobile Line */}
        <div className="absolute left-0 top-2 bottom-0 w-px bg-gray-200 dark:bg-slate-700 md:hidden" />
        <div className="absolute left-[-5px] top-2.5 w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500 md:hidden" />

        {/* Content */}
        <div className="md:col-span-8 mb-12 relative">
          <div className="md:hidden mb-2">
             <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded mr-2">{exp.period}</span>
             <span className="text-sm font-semibold text-gray-900 dark:text-white">{exp.company}</span>
          </div>
          
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">{exp.role}</h3>
          
          <ul className="space-y-2">
            {exp.description.map((desc, i) => (
              <li key={i} className="flex items-start text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full flex-shrink-0" />
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceItem;