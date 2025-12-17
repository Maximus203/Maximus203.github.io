import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, File, CheckCircle, Send } from 'lucide-react';

interface ProjectRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  labels: Record<string, string>;
}

const ProjectRequestModal: React.FC<ProjectRequestModalProps> = ({ isOpen, onClose, labels }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    details: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ firstName: '', lastName: '', email: '', details: '' });
        setFile(null);
        onClose();
      }, 2000);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{labels.submitProjectTitle}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{labels.submitProjectDesc}</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-2">
                       <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Merci !</h3>
                    <p className="text-gray-600 dark:text-gray-300">{labels.successMessage}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 ml-1">{labels.firstName}</label>
                        <input 
                          required
                          type="text" 
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900/30 outline-none transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 ml-1">{labels.lastName}</label>
                        <input 
                          required
                          type="text" 
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900/30 outline-none transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 ml-1">{labels.email}</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900/30 outline-none transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 ml-1">{labels.projectDetails}</label>
                      <textarea 
                        required
                        rows={4}
                        value={formData.details}
                        onChange={(e) => setFormData({...formData, details: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900/30 outline-none transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400 resize-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                       <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 ml-1">{labels.attachFile}</label>
                       <div 
                         onClick={() => fileInputRef.current?.click()}
                         className="border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 rounded-xl p-6 transition-all cursor-pointer text-center group"
                       >
                         <input 
                           type="file" 
                           ref={fileInputRef} 
                           onChange={handleFileChange} 
                           className="hidden" 
                         />
                         {file ? (
                           <div className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                              <File size={20} />
                              <span className="truncate max-w-[200px]">{file.name}</span>
                           </div>
                         ) : (
                           <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-indigo-500 transition-colors">
                              <UploadCloud size={24} />
                              <span className="text-sm">{labels.filePlaceholder}</span>
                           </div>
                         )}
                       </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                       <button 
                         type="button" 
                         onClick={onClose}
                         className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                       >
                         {labels.cancel}
                       </button>
                       <button 
                         type="submit" 
                         disabled={isSubmitting}
                         className="flex-[2] py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                       >
                         {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                         ) : (
                            <>
                              <Send size={18} />
                              {labels.send}
                            </>
                         )}
                       </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectRequestModal;