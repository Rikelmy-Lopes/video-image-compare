import React from 'react';
import { useStore } from '../store/useStore';
import { HelpCircle } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { leftImage, rightImage, scale, position } = useStore();

  return (
    <footer className="bg-dark-800 border-t border-slate-700/60 px-4 py-2 flex items-center justify-between text-xs text-slate-400 select-none z-30 shadow-inner">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="font-medium text-slate-300">Before:</span>
          <span className="text-slate-400 truncate max-w-[150px]" title={leftImage?.name || 'None'}>
            {leftImage ? `${leftImage.name} (${leftImage.width}×${leftImage.height})` : 'No image'}
          </span>
        </div>

        <div className="h-3 w-px bg-slate-700 hidden sm:block" />

        <div className="hidden sm:flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-400" />
          <span className="font-medium text-slate-300">After:</span>
          <span className="text-slate-400 truncate max-w-[150px]" title={rightImage?.name || 'None'}>
            {rightImage ? `${rightImage.name} (${rightImage.width}×${rightImage.height})` : 'No image'}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-3 text-slate-400">
          <span>Pan: <strong className="font-mono text-slate-300">X: {Math.round(position.x)}, Y: {Math.round(position.y)}</strong></span>
          <span>Zoom: <strong className="font-mono text-slate-300">{Math.round(scale * 100)}%</strong></span>
        </div>

        <div className="flex items-center space-x-1 text-slate-400 bg-dark-900/60 px-2.5 py-1 rounded-md border border-slate-700/50">
          <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
          <span>Scroll to zoom • Click & drag to pan</span>
        </div>
      </div>
    </footer>
  );
};
