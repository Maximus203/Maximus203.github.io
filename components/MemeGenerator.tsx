import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Upload, Download, Type, Palette, Image as ImageIcon, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { UI_LABELS } from '../constants';

interface MemeGeneratorProps {
  onBack: () => void;
  labels?: Record<string, string>;
}

const MemeGenerator: React.FC<MemeGeneratorProps> = ({ onBack, labels }) => {
  const [image, setImage] = useState<string | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [fontSize, setFontSize] = useState(40);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultImage = "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=1000";

  useEffect(() => {
    if (!image) {
       setImage(defaultImage);
    }
  }, []);

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = image;
      img.onload = () => {
        // Maintain aspect ratio but fit in container (max width/height)
        const maxWidth = 800;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
           const ratio = Math.min(maxWidth / width, maxHeight / height);
           width *= ratio;
           height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw Image
        ctx.drawImage(img, 0, 0, width, height);

        // Configure Text Styles
        ctx.font = `900 ${fontSize}px Impact, sans-serif`;
        ctx.fillStyle = textColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = fontSize / 15;
        ctx.textAlign = 'center';
        
        // Draw Top Text
        if (topText) {
          drawText(ctx, topText.toUpperCase(), width / 2, fontSize + 10, width - 20);
        }

        // Draw Bottom Text
        if (bottomText) {
          drawText(ctx, bottomText.toUpperCase(), width / 2, height - 20, width - 20);
        }
      };
    }
  }, [image, topText, bottomText, fontSize, textColor, strokeColor]);

  // Helper for text wrapping/fitting
  const drawText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number) => {
     // Simple wrap logic could go here, for now just fill
     ctx.strokeText(text, x, y, maxWidth);
     ctx.fillText(text, x, y, maxWidth);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  // Fallback for labels if not passed
  const t = (key: string) => labels?.[key] || key;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-6xl mx-auto w-full min-h-screen pb-24"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Retour aux outils</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm space-y-6">
             <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold border-b border-gray-100 dark:border-slate-700 pb-4">
                <ImageIcon size={20} />
                <h2>{t('memeUpload')}</h2>
             </div>
             
             <div 
               onClick={() => fileInputRef.current?.click()}
               className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all group"
             >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
                <Upload size={32} className="text-gray-400 group-hover:text-indigo-500 mb-2 transition-colors" />
                <p className="text-sm font-medium text-gray-500 group-hover:text-indigo-600">{t('memeDragDrop')}</p>
             </div>

             <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 mb-1.5 block">{t('memeTopText')}</label>
                  <input 
                    type="text" 
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    placeholder="TOP TEXT"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 focus:border-indigo-500 outline-none text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 mb-1.5 block">{t('memeBottomText')}</label>
                  <input 
                    type="text" 
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    placeholder="BOTTOM TEXT"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 focus:border-indigo-500 outline-none text-gray-900 dark:text-white"
                  />
                </div>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold border-b border-gray-100 dark:border-slate-700 pb-4">
                <Type size={20} />
                <h2>Styles</h2>
             </div>
             
             <div className="space-y-4">
                 <div>
                    <label className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1.5">
                       <span>{t('memeFontSize')}</span>
                       <span>{fontSize}px</span>
                    </label>
                    <input 
                      type="range" 
                      min="20" 
                      max="100" 
                      value={fontSize} 
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold uppercase text-gray-500 mb-1.5 block">{t('memeTextColor')}</label>
                        <div className="flex items-center gap-2">
                           <input 
                             type="color" 
                             value={textColor} 
                             onChange={(e) => setTextColor(e.target.value)}
                             className="w-10 h-10 rounded-lg border-0 p-0 cursor-pointer"
                           />
                           <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{textColor}</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-semibold uppercase text-gray-500 mb-1.5 block">{t('memeStrokeColor')}</label>
                        <div className="flex items-center gap-2">
                           <input 
                             type="color" 
                             value={strokeColor} 
                             onChange={(e) => setStrokeColor(e.target.value)}
                             className="w-10 h-10 rounded-lg border-0 p-0 cursor-pointer"
                           />
                           <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{strokeColor}</span>
                        </div>
                    </div>
                 </div>
             </div>
          </div>

          <button 
             onClick={handleDownload}
             className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
          >
             <Download size={24} />
             {t('memeDownload')}
          </button>
        </div>

        {/* Right: Preview */}
        <div className="lg:col-span-8 flex flex-col">
           <div className="flex-grow bg-[#0d1117] border border-gray-800 rounded-3xl p-4 sm:p-8 flex items-center justify-center shadow-2xl relative overflow-hidden">
               {/* Pattern Background */}
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
               
               <canvas 
                  ref={canvasRef} 
                  className="max-w-full max-h-[70vh] rounded shadow-xl object-contain relative z-10"
               />

               {!image && (
                   <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                       <span className="text-gray-500">Loading Preview...</span>
                   </div>
               )}
           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default MemeGenerator;