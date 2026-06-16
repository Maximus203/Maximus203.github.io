'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, Image as ImageIcon, FileOutput, Settings, Download, X, RefreshCw, CheckCircle, AlertCircle, Archive, ChevronDown, ArrowRight } from 'lucide-react';
import JSZip from 'jszip';
import saveAs from 'file-saver';
import Link from 'next/link';
import { Language } from '@/types';

interface ImageConverterProps {
  lang: Language;
}

interface FileWithPreview {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'converting' | 'done' | 'error';
  errorMessage?: string;
  convertedUrl?: string;
  convertedSize?: number;
  originalSize: number;
}

const FORMATS = [
  { value: 'image/jpeg', label: 'JPEG (.jpg)', ext: 'jpg' },
  { value: 'image/png', label: 'PNG (.png)', ext: 'png' },
  { value: 'image/webp', label: 'WebP (.webp)', ext: 'webp' },
  { value: 'image/x-icon', label: 'ICO (.ico)', ext: 'ico' }, // Simulation via resizing
];

const ImageConverter: React.FC<ImageConverterProps> = ({ lang }) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [targetFormat, setTargetFormat] = useState('image/webp');
  const [quality, setQuality] = useState(0.8);
  const [isDragging, setIsDragging] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFiles = (incomingFiles: FileList | File[]) => {
    const newFiles: FileWithPreview[] = Array.from(incomingFiles).map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      status: 'pending',
      originalSize: file.size
    }));
    setFiles(prev => [...prev, ...newFiles]);
    // #24 — conversion automatique au drop/sélection : plus de 2e clic distant
    void convertFiles(newFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter(f => f.id !== id);
    });
  };

  const convertImage = async (fileItem: FileWithPreview) => {
    return new Promise<void>((resolve) => {
      const img = new Image();

      img.onload = () => {
        try {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Special handling for ICO: resize to max 256x256 to be compatible
            if (targetFormat === 'image/x-icon') {
                const maxSize = 256;
                if (width > maxSize || height > maxSize) {
                    const ratio = Math.min(maxSize / width, maxSize / height);
                    width = width * ratio;
                    height = height * ratio;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                throw new Error("Impossible d'initialiser le contexte graphique.");
            }

            // White background for JPEGs (remove transparency)
            if (targetFormat === 'image/jpeg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            ctx.drawImage(img, 0, 0, width, height);

            // Browser native conversion
            const exportMime = targetFormat === 'image/x-icon' ? 'image/png' : targetFormat;

            canvas.toBlob((blob) => {
                if (blob) {
                const url = URL.createObjectURL(blob);
                setFiles(prev => prev.map(f => {
                    if (f.id === fileItem.id) {
                    return {
                        ...f,
                        status: 'done',
                        convertedUrl: url,
                        convertedSize: blob.size,
                        errorMessage: undefined
                    };
                    }
                    return f;
                }));
                } else {
                    setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, status: 'error', errorMessage: "\u00C9chec de la conversion du fichier." } : f));
                }
                resolve();
            }, exportMime, quality);
        } catch (error) {
            console.error(error);
            setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, status: 'error', errorMessage: "Erreur inattendue lors du traitement." } : f));
            resolve();
        }
      };

      img.onerror = () => {
          setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, status: 'error', errorMessage: "Fichier image corrompu ou illisible." } : f));
          resolve();
      };

      img.src = fileItem.preview;
    });
  };

  // Convertit une liste cible (séquentiel pour ne pas bloquer l'UI).
  const convertFiles = async (targets: FileWithPreview[]) => {
    if (targets.length === 0) return;
    const ids = new Set(targets.map(t => t.id));
    setFiles(prev => prev.map(f => (ids.has(f.id) ? { ...f, status: 'converting', errorMessage: undefined } : f)));
    for (const file of targets) {
      await convertImage(file);
    }
  };

  // Bouton « Convertir Tout » : reconvertit tout avec les réglages courants
  // (utile après un changement de format/qualité ; le 1er passage est déjà auto au drop).
  const handleConvertAll = () => {
    void convertFiles(files);
  };

  // #26 — charge une image de démo LOCALE (zéro réseau externe) et la convertit
  // pour montrer la valeur (le gain de poids) avant que l'utilisateur engage son fichier.
  const loadDemoImage = async () => {
    setIsLoadingDemo(true);
    try {
      const res = await fetch('/assets/galerie/devfest-1.jpg');
      const blob = await res.blob();
      const demoFile = new File([blob], 'demo-devfest.jpg', { type: blob.type || 'image/jpeg' });
      processFiles([demoFile]);
    } catch (error) {
      console.error('Impossible de charger l\'image de démo', error);
    } finally {
      setIsLoadingDemo(false);
    }
  };

  const handleDownloadAll = async () => {
    const convertedFiles = files.filter(f => f.status === 'done' && f.convertedUrl);
    if (convertedFiles.length === 0) return;

    setIsZipping(true);
    try {
        const zip = new JSZip();

        // Add files to zip
        for (const fileItem of convertedFiles) {
            if (fileItem.convertedUrl) {
                // Fetch blob from blob url
                const response = await fetch(fileItem.convertedUrl);
                const blob = await response.blob();
                const fileName = getDownloadName(fileItem.file.name);
                zip.file(fileName, blob);
            }
        }

        // Generate zip
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "converted_images.zip");

    } catch (error) {
        console.error("Error creating zip", error);
        alert("Une erreur est survenue lors de la cr\u00E9ation de l'archive.");
    } finally {
        setIsZipping(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // #25 — gain de poids : pourcentage d'octets économisés (positif = plus léger).
  const getReduction = (original: number, converted?: number) => {
    if (!original || !converted) return null;
    return Math.round((1 - converted / original) * 100);
  };

  const getDownloadName = (originalName: string) => {
     const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
     const ext = FORMATS.find(f => f.value === targetFormat)?.ext || 'jpg';
     return `${nameWithoutExt}_converted.${ext}`;
  };

  const hasConvertedFiles = files.some(f => f.status === 'done');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto w-full min-h-screen pb-24"
    >
      <Link
        href={`/${lang}/tools/`}
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Retour aux outils</span>
      </Link>

      <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">

        {/* Header Configuration */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-900/50">
           <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
              <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                     <RefreshCw className="text-blue-500" />
                     Convertisseur d&apos;Images
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Convertissez vos images localement, sans envoi vers un serveur.</p>
              </div>

              <div className="flex flex-wrap gap-4 items-center bg-white dark:bg-slate-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  {/* Styled Select */}
                  <div className="flex items-center gap-2">
                      <FileOutput size={16} className="text-gray-400" />
                      <div className="relative group">
                        <select
                           value={targetFormat}
                           onChange={(e) => setTargetFormat(e.target.value)}
                           className="appearance-none pl-2 pr-8 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-700 text-sm font-medium text-gray-900 dark:text-white border border-transparent focus:border-blue-500 outline-none cursor-pointer transition-colors w-32 md:w-40"
                        >
                           {FORMATS.map(f => (
                               <option key={f.value} value={f.value} className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white py-1">
                                   {f.label}
                               </option>
                           ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-hover:text-blue-500 transition-colors" />
                      </div>
                  </div>

                  {targetFormat !== 'image/png' && targetFormat !== 'image/x-icon' && (
                      <div className="flex items-center gap-2 border-l border-gray-200 dark:border-gray-700 pl-4">
                          <Settings size={16} className="text-gray-400" />
                          <label className="text-xs font-medium text-gray-500 mr-2 whitespace-nowrap">Qualit&eacute;: {Math.round(quality * 100)}%</label>
                          <input
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.1"
                            value={quality}
                            onChange={(e) => setQuality(parseFloat(e.target.value))}
                            className="w-20 accent-blue-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                      </div>
                  )}

                  <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-1 hidden sm:block" />

                  <button
                     onClick={handleConvertAll}
                     disabled={files.length === 0}
                     className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                      <RefreshCw size={16} className={files.some(f => f.status === 'converting') ? "animate-spin" : ""} />
                      {files.some(f => f.status === 'error') ? 'R\u00E9essayer' : 'Convertir Tout'}
                  </button>

                  {hasConvertedFiles && (
                      <button
                         onClick={handleDownloadAll}
                         disabled={isZipping}
                         className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-70 disabled:cursor-wait text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                      >
                          {isZipping ? <RefreshCw size={16} className="animate-spin" /> : <Archive size={16} />}
                          <span className="hidden sm:inline">Tout t&eacute;l&eacute;charger (.zip)</span>
                          <span className="sm:hidden">.zip</span>
                      </button>
                  )}
              </div>
           </div>
        </div>

        {/* Upload Area */}
        <div className="p-6 md:p-8">
            <div
               onDragOver={handleDragOver}
               onDragLeave={handleDragLeave}
               onDrop={handleDrop}
               className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-blue-400'}`}
            >
               <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  multiple
                  accept="image/*"
               />
               <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-gray-400">
                  <Upload size={32} />
               </div>
               <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">Glissez vos images ici</p>
               <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">JPG, PNG, WEBP, GIF, SVG support&eacute;s</p>
               <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
               >
                  S&eacute;lectionner des fichiers
               </button>
            </div>
        </div>

        {/* Files Grid */}
        <div className="bg-gray-50 dark:bg-[#0d1117] border-t border-gray-200 dark:border-gray-800 p-6">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 <AnimatePresence>
                     {files.map((file) => (
                         <motion.div
                             key={file.id}
                             initial={{ opacity: 0, scale: 0.95 }}
                             animate={{ opacity: 1, scale: 1 }}
                             exit={{ opacity: 0, scale: 0.95 }}
                             className={`bg-white dark:bg-slate-900 border rounded-xl p-3 shadow-sm flex gap-3 relative group transition-colors ${
                                file.status === 'error'
                                    ? 'border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10'
                                    : 'border-gray-200 dark:border-gray-800'
                             }`}
                         >
                             <button
                                onClick={() => removeFile(file.id)}
                                className="absolute top-2 right-2 p-1 bg-white dark:bg-slate-800 rounded-full text-gray-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                             >
                                <X size={14} />
                             </button>

                             <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-lg flex-shrink-0 overflow-hidden relative">
                                <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                                {file.status === 'converting' && (
                                   <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                       <RefreshCw size={20} className="text-white animate-spin" />
                                   </div>
                                )}
                             </div>

                             <div className="flex-grow min-w-0 flex flex-col justify-center">
                                 <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate" title={file.file.name}>{file.file.name}</h4>
                                 {file.status !== 'done' && (
                                    <p className="text-xs text-gray-500 mb-2">{formatSize(file.originalSize)}</p>
                                 )}

                                 {file.status === 'done' ? (
                                     <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5 text-xs font-medium min-w-0 flex-wrap">
                                            <CheckCircle size={14} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                                            <span className="text-gray-500 dark:text-gray-400">{formatSize(file.originalSize)}</span>
                                            <ArrowRight size={12} className="text-gray-400 flex-shrink-0" />
                                            <span className="text-gray-900 dark:text-white font-semibold">{formatSize(file.convertedSize || 0)}</span>
                                            {(() => {
                                                const reduction = getReduction(file.originalSize, file.convertedSize);
                                                if (reduction === null) return null;
                                                const lighter = reduction >= 0;
                                                return (
                                                    <span className={lighter ? 'text-green-600 dark:text-green-400' : 'text-orange-500 dark:text-orange-400'} title={lighter ? 'Poids \u00E9conomis\u00E9' : 'Poids augment\u00E9'}>
                                                        ({lighter ? '\u2212' : '+'}{Math.abs(reduction)}{'\u00A0'}%)
                                                    </span>
                                                );
                                            })()}
                                        </div>
                                        <a
                                           href={file.convertedUrl}
                                           download={getDownloadName(file.file.name)}
                                           className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors flex-shrink-0"
                                           title="T\u00E9l\u00E9charger"
                                        >
                                            <Download size={16} />
                                        </a>
                                     </div>
                                 ) : file.status === 'error' ? (
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
                                            <AlertCircle size={14} />
                                            <span>&Eacute;chec</span>
                                        </div>
                                        {file.errorMessage && (
                                            <p className="text-[10px] text-red-500 dark:text-red-300 leading-tight">{file.errorMessage}</p>
                                        )}
                                    </div>
                                 ) : (
                                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                                        <ImageIcon size={14} />
                                        <span>En attente</span>
                                    </div>
                                 )}
                             </div>
                         </motion.div>
                     ))}
                 </AnimatePresence>
             </div>

             {files.length === 0 && (
                 <div className="flex flex-col items-center text-center py-10">
                     {/* #26 — mini-démo de valeur : montrer le gain de poids AVANT d'engager un fichier */}
                     <div className="flex items-center gap-2 sm:gap-3 mb-4">
                         <div className="px-3 sm:px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                             <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">Avant</p>
                             <p className="text-base sm:text-lg font-bold text-gray-500 dark:text-gray-400">1.5 MB</p>
                             <p className="text-[10px] text-gray-400">PNG</p>
                         </div>
                         <ArrowRight className="text-blue-500 flex-shrink-0" size={26} />
                         <div className="px-3 sm:px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 shadow-sm">
                             <p className="text-[10px] uppercase tracking-wider text-blue-400 mb-0.5">Apr&egrave;s</p>
                             <p className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400">410 KB</p>
                             <p className="text-[10px] text-blue-400">WebP</p>
                         </div>
                         <div className="ml-1 px-3 py-2 rounded-xl bg-green-100 dark:bg-green-900/30">
                             <p className="text-lg sm:text-xl font-extrabold text-green-600 dark:text-green-400">&minus;73&nbsp;%</p>
                             <p className="text-[10px] text-green-700 dark:text-green-500">de poids</p>
                         </div>
                     </div>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md">
                         D&eacute;posez vos images ci-dessus : la conversion est automatique et vous voyez aussit&ocirc;t le poids &eacute;conomis&eacute;.
                     </p>
                     <button
                        onClick={loadDemoImage}
                        disabled={isLoadingDemo}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-wait text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2 shadow-sm"
                     >
                        {isLoadingDemo ? <RefreshCw size={16} className="animate-spin" /> : <ImageIcon size={16} />}
                        Essayer avec une image de d&eacute;mo
                     </button>
                 </div>
             )}
        </div>

      </div>
    </motion.div>
  );
};

export default ImageConverter;
