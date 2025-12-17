import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Coffee, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import React from 'react';
import { ResumeData } from '../types';

interface StickySidebarProps {
  data: ResumeData['profile'];
  labels: Record<string, string>;
}

const StickySidebar: React.FC<StickySidebarProps> = ({ data, labels }) => {
  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="space-y-6">
      {/* Main Profile Card with 3D Tilt */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative group perspective-1000"
      >
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-2 shadow-xl dark:shadow-none border border-gray-100 dark:border-slate-700 overflow-hidden relative transition-colors duration-300">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gray-100 dark:bg-slate-900">
            <img
              src={data.avatar || "/assets/photo.webp"}
              alt={data.name}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

            <div className="absolute top-6 left-6 text-white translate-z-10">
              <h2 className="text-xl font-bold mb-1">{data.name.split(" ").slice(-2).join(" ")}</h2>
              <p className="text-sm text-gray-200 mb-2">{data.role}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">{labels.available || "Available"}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Widget Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Widget 1: Location */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col justify-between h-32 transition-colors duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400">
            <MapPin size={16} />
          </div>
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-semibold">{labels.base}</p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate" title={data.location}>Dakar, SN</p>
          </div>
        </motion.div>

        {/* Widget 2: Download CV */}
        <motion.a
          href="/assets/documents/CV.pdf"
          target="_blank"
          download="Cherif_Diouf_CV.pdf"
          whileHover={{ scale: 1.02 }}
          className="bg-indigo-600 dark:bg-indigo-600 text-white p-4 rounded-3xl shadow-lg shadow-indigo-200 dark:shadow-none flex flex-col justify-between h-32 cursor-pointer group transition-colors duration-300 hover:bg-indigo-700"
        >
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
              <Download size={16} />
            </div>
            <span className="text-xs font-mono text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">.pdf</span>
          </div>
          <div>
            <p className="text-xs text-white/70 uppercase font-semibold">{labels.resume}</p>
            <p className="text-sm font-medium text-white">{labels.download}</p>
          </div>
        </motion.a>
      </div>

      {/* Social Links */}
      <div className="flex gap-2">
        <SocialButton href={`mailto:${data.email}`} icon={<Mail size={20} />} label="Email" />
        <SocialButton href={`https://${data.linkedin}`} icon={<Linkedin size={20} />} label="LinkedIn" />
        <SocialButton href={`https://${data.github}`} icon={<Github size={20} />} label="GitHub" />
      </div>

      {/* Fun Widget: Coffee & Code */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 p-6 rounded-3xl border border-indigo-100/50 dark:border-slate-700 transition-colors duration-300">
        <div className="flex items-center gap-3 mb-3">
          <Coffee className="text-indigo-600 dark:text-indigo-400" size={20} />
          <h3 className="font-semibold text-gray-800 dark:text-white">{labels.status}</h3>
        </div>
        <div className="font-mono text-sm text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-slate-900/50 p-3 rounded-xl backdrop-blur-sm">
          <span className="text-purple-600 dark:text-purple-400">const</span> mood = <span className="text-green-600 dark:text-green-400">"Focused"</span>;
          <br />
          <span className="text-purple-600 dark:text-purple-400">await</span> coffee.drink();
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="flex-1 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 h-12 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
    aria-label={label}
  >
    {icon}
  </motion.a>
);

export default StickySidebar;