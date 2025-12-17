import React from 'react';
import { motion } from 'framer-motion';
import { GalleryItem } from '../types';
import { Camera } from 'lucide-react';

interface GalleryGridProps {
  items: GalleryItem[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items }) => {
  return (
    <div className="columns-1 md:columns-2 gap-4 space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800"
        >
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span className="text-indigo-400 text-xs font-mono font-medium mb-1">{item.category} • {item.date}</span>
            <h3 className="text-white font-bold text-lg">{item.title}</h3>
          </div>
        </motion.div>
      ))}
      
      {/* Fallback box if gallery is small */}
      {items.length === 0 && (
        <div className="w-full h-64 bg-gray-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center text-gray-400">
           <Camera size={32} className="mb-2" />
           <p>No photos yet</p>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;