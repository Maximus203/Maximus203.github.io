import React from 'react';
import { ResumeData } from '../types';
import { Github, Linkedin, Mail, Youtube, Instagram, ArrowUp, Code2, Heart, Rocket, Coffee } from 'lucide-react';

interface FooterProps {
  data: ResumeData['profile'];
  labels: Record<string, string>;
  onNavClick: (target: string, isViewChange?: boolean) => void;
  onToolLaunch: (toolId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ data, labels, onNavClick, onToolLaunch }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-16 pb-8 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300 w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={data.avatar || "https://cherif-diouf.artist-dev.com/assets/photo.webp"} 
                alt={data.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm"
              />
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                Cherif Diouf
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              {labels.footerQuote}
            </p>
          </div>

          {/* Column 2: Sections */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs mb-6">
              {labels.sections}
            </h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => onNavClick('skills')} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">
                  {labels.skills}
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('projects')} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">
                  {labels.projects}
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('about')} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">
                  {labels.about}
                </button>
              </li>
              <li>
                 <button onClick={() => onNavClick('gallery', true)} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">
                  {labels.gallery}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Pages/Tools */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs mb-6">
              {labels.pages}
            </h3>
            <ul className="space-y-3">
               <li>
                 <button onClick={() => onNavClick('projects')} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">
                   {labels.allProjects}
                 </button>
               </li>
               <li>
                 <a href="/cv.pdf" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">
                   {labels.resume}
                 </a>
               </li>
               <li>
                 <button onClick={() => onToolLaunch('readme')} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">
                   {labels.toolReadme}
                 </button>
               </li>
               <li>
                 <button onClick={() => onToolLaunch('meme')} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">
                   {labels.toolMeme}
                 </button>
               </li>
               <li>
                 <button onClick={() => onToolLaunch('converter')} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">
                   {labels.toolConverter}
                 </button>
               </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs mb-6">
              {labels.connect}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href={`https://${data.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors flex items-center gap-2">
                  <Linkedin size={16} /> LinkedIn
                </a>
              </li>
              <li>
                <a href={`https://${data.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors flex items-center gap-2">
                  <Github size={16} /> GitHub
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@printf_cherif" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 text-sm transition-colors flex items-center gap-2">
                   <Youtube size={16} /> YouTube
                </a>
              </li>
              <li>
                 <a href="https://instagram.com/printf_cherif" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 text-sm transition-colors flex items-center gap-2">
                   <Instagram size={16} /> Instagram
                 </a>
              </li>
              <li>
                 <a href={`mailto:${data.email}`} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors flex items-center gap-2">
                   <Mail size={16} /> Email
                 </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-xs text-gray-400 dark:text-gray-500">
             © {currentYear} Cherif Diouf. {labels.rights}
           </p>
           
           <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-gray-400 dark:text-gray-500">
              <div className="flex items-center gap-1.5">
                 <span>{labels.builtWith}</span>
                 <div className="p-1 bg-gray-100 dark:bg-slate-800 rounded">
                    <Heart size={12} className="text-red-500 fill-current" />
                 </div>
                 <span className="font-medium text-gray-600 dark:text-gray-400">Passion & Caféine</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-700" />
              <div className="flex items-center gap-1.5">
                 <span>Hébergé dans</span>
                 <Rocket size={12} className="text-purple-500" />
                 <span className="font-medium text-gray-600 dark:text-gray-400">une autre dimension</span>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;