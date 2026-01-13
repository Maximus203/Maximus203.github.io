import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number; // Previous Z
}

const IntroAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Audio Playback
    const playAudio = async () => {
      try {
        const audio = new Audio('/happy.mp3');
        audio.volume = 0.5;
        await audio.play();
      } catch (err) {
        // Autoplay policies might block this without interaction, 
        // silently catch to avoid console errors.
        console.log("Audio autoplay blocked or file not found.");
      }
    };
    playAudio();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;

    // Configuration Vortex
    const starCount = 1000;
    const stars: Star[] = [];
    
    // On commence avec une vitesse plus élevée pour éviter l'effet "statique" au début
    let speed = 5; 
    const maxSpeed = 50;
    const acceleration = 1.02; // Accélération progressive
    
    let animationFrameId: number;
    let startTime = Date.now();
    const duration = 2500; // Durée

    // Redimensionnement
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      cx = width / 2;
      cy = height / 2;
    };

    // Initialisation des étoiles
    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: (Math.random() - 0.5) * width * 2,
          y: (Math.random() - 0.5) * height * 2,
          z: Math.random() * width,
          pz: Math.random() * width,
        });
      }
    };

    window.addEventListener('resize', resize);
    resize();
    initStars();

    // Boucle d'animation
    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      // Fond Slate 950 avec opacité pour l'effet de traînée (Trail effect)
      // Correspond à la couleur dark:bg-slate-950 du site
      ctx.fillStyle = "rgba(2, 6, 23, 0.3)"; 
      ctx.fillRect(0, 0, width, height);

      // Accélération jusqu'à une vitesse max
      if (speed < maxSpeed) {
          speed *= acceleration;
      }

      // Couleur des étoiles : Indigo (Brand Color) qui devient plus lumineux/blanc
      const progress = Math.min(elapsed / duration, 1);
      // Hue 245 = Indigo (couleur primaire du site)
      const hue = 245; 
      // Saturation élevée, Luminosité qui augmente avec la vitesse (50% -> 90%)
      ctx.strokeStyle = `hsl(${hue}, 80%, ${60 + (progress * 30)}%)`;

      // Dessin des étoiles
      for (let i = 0; i < starCount; i++) {
        const star = stars[i];
        
        // Sauvegarder l'ancien Z pour le calcul de la ligne
        star.pz = star.z;

        // Mouvement
        star.z -= speed;

        // Reset si l'étoile passe derrière la caméra
        if (star.z <= 0) {
          star.z = width;
          star.pz = width; // Reset pz pour éviter une ligne qui traverse l'écran
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        // Projection 3D -> 2D
        // x = (x3d / z) * perspective_factor
        const x = cx + (star.x / star.z) * cx;
        const y = cy + (star.y / star.z) * cy;

        // Ancienne position pour la traînée (effet warp)
        const px = cx + (star.x / star.pz) * cx;
        const py = cy + (star.y / star.pz) * cy;

        // Dessin de la ligne (Warp)
        const size = (1 - star.z / width); // Plus gros si proche
        
        if (star.z < width - 10) { // Éviter de dessiner les étoiles qui viennent d'apparaitre au fond
            ctx.lineWidth = size * 2;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
      }

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "brightness(300%)" }} // Flash blanc à la fin
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#020617] overflow-hidden flex items-center justify-center"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Texte centré et stable */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.1em" }}
        animate={{ opacity: 1, scale: 1, letterSpacing: "0.2em" }}
        exit={{ opacity: 0, scale: 1.2, letterSpacing: "0.5em" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="text-3xl md:text-6xl font-black text-white font-mono uppercase mix-blend-difference">
          Bienvenue chez moi
        </h1>
      </motion.div>
    </motion.div>
  );
};

export default IntroAnimation;