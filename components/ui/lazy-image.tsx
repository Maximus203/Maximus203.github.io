import { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
 src: string;
 alt: string;
 className?: string;
 placeholder?: string;
}

export default function LazyImage({ src, alt, className = '', placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3C/svg%3E' }: LazyImageProps) {
 const [isLoaded, setIsLoaded] = useState(false);
 const [isInView, setIsInView] = useState(false);
 const imgRef = useRef<HTMLImageElement>(null);

 useEffect(() => {
  const observer = new IntersectionObserver(
   ([entry]) => {
    if (entry.isIntersecting) {
     setIsInView(true);
     observer.disconnect();
    }
   },
   { threshold: 0.1 }
  );

  if (imgRef.current) {
   observer.observe(imgRef.current);
  }

  return () => observer.disconnect();
 }, []);

 return (
  <img
   ref={imgRef}
   src={isInView ? src : placeholder}
   alt={alt}
   className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
   onLoad={() => setIsLoaded(true)}
   loading="lazy"
  />
 );
}