import React from 'react';
import { Terminal } from 'lucide-react';

interface TerminalBlockProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const TerminalBlock: React.FC<TerminalBlockProps> = ({ title = "bash", children, className = "" }) => {
  return (
    <div className={`rounded-xl overflow-hidden bg-[#0d1117] border border-gray-800 shadow-2xl ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
          <Terminal size={12} />
          <span>{title}</span>
        </div>
      </div>
      <div className="p-4 font-mono text-sm sm:text-base text-gray-300 overflow-x-auto">
        {children}
      </div>
    </div>
  );
};

export default TerminalBlock;