import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Smile, Image, ArrowRight, Zap, RefreshCw, Github } from 'lucide-react';

interface ToolsGridProps {
  labels: Record<string, string>;
  onLaunch: (id: string) => void;
}

const ToolsGrid: React.FC<ToolsGridProps> = ({ labels, onLaunch }) => {
  const tools = [
    {
      id: 'readme',
      title: labels.toolReadme,
      desc: labels.toolReadmeDesc,
      icon: <FileText size={32} className="text-white" />,
      color: 'bg-emerald-500',
      actionIcon: <Github size={18} />
    },
    {
      id: 'meme',
      title: labels.toolMeme,
      desc: labels.toolMemeDesc,
      icon: <Smile size={32} className="text-white" />,
      color: 'bg-amber-500',
      actionIcon: <Zap size={18} />
    },
    {
      id: 'converter',
      title: labels.toolConverter,
      desc: labels.toolConverterDesc,
      icon: <RefreshCw size={32} className="text-white" />,
      color: 'bg-blue-500',
      actionIcon: <Image size={18} />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tools.map((tool, index) => (
        <motion.div
          key={tool.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, duration: 0.5 }}
          whileHover={{ y: -5 }}
          className="group relative bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl dark:hover:shadow-indigo-900/10 overflow-hidden flex flex-col"
        >
          {/* Header Colored Block */}
          <div className={`h-24 ${tool.color} relative overflow-hidden flex items-center justify-center`}>
             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
             <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                {tool.icon}
             </div>
             
             {/* Decorative Circles */}
             <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/20 rounded-full blur-xl" />
             <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-lg" />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{tool.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
              {tool.desc}
            </p>
            
            <button 
              onClick={() => onLaunch(tool.id)}
              className="mt-auto w-full py-3 px-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 text-gray-700 dark:text-white font-medium text-sm flex items-center justify-center gap-2 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-indigo-600 transition-all duration-300"
            >
               {tool.actionIcon}
               <span>{labels.launch}</span>
               <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ToolsGrid;