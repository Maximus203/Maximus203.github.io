import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { GalleryItem } from '../types';

interface GalleryCarouselProps {
  items: GalleryItem[];
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for infinite scroll
  const duplicatedItems = [...items, ...items, ...items];

  // Auto Scroll Logic with infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && !isDown && scrollRef.current) {
        const maxScroll = scrollRef.current.scrollWidth / 3; // Original items width

        if (scrollRef.current.scrollLeft >= maxScroll) {
          // Reset to beginning without animation for seamless loop
          scrollRef.current.scrollLeft = 0;
        } else {
          scrollRef.current.scrollLeft += 1;
        }
      }
    }, 20); // Update every 20ms for smooth animation

    return () => clearInterval(interval);
  }, [isPaused, isDown]);

  // Mouse Down (Start Drag)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  // Mouse Up / Leave (Stop Drag)
  const handleMouseUp = () => {
    setIsDown(false);
  };

  // Mouse Move (Drag)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  if (items.length === 0) return null;

  return (
    <div
      className="w-full relative mb-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsDown(false);
      }}
    >
      <div className="flex items-center gap-2 mb-4 text-gray-500 dark:text-gray-400 text-sm font-mono">
        <MoveRight size={16} className="animate-pulse" />
        <span>Drag to explore</span>
      </div>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {duplicatedItems.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative flex-shrink-0 w-[85vw] md:w-[600px] h-[350px] md:h-[400px] rounded-3xl overflow-hidden group select-none"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
              draggable={false}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
              <div className="inline-block px-3 py-1 mb-3 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-mono">
                {item.category}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm font-medium">
                {item.date}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Spacer for right padding */}
        <div className="w-6 flex-shrink-0" />
      </div>
    </div>
  );
};

export default GalleryCarousel;