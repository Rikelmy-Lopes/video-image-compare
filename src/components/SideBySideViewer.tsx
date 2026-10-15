import React from 'react';
import { useStore } from '../store/useStore';

export const SideBySideViewer: React.FC = () => {
  const { leftImage, rightImage, scale, position } = useStore();

  const defaultWidth = 1200;
  const defaultHeight = 800;

  const w = leftImage?.width || rightImage?.width || defaultWidth;
  const h = leftImage?.height || rightImage?.height || defaultHeight;

  return (
    <div className="w-full h-full flex items-center justify-center p-4 gap-4 overflow-hidden select-none">
      {/* Left Panel */}
      <div className="flex-1 h-full flex items-center justify-center overflow-hidden relative bg-dark-900/50 rounded-2xl border border-slate-700/60 shadow-xl">
        <div 
          className="relative transition-transform duration-75 ease-out"
          style={{
            width: `${w}px`,
            height: `${h}px`,
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <div className="absolute inset-0 w-full h-full bg-dark-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700/50">
            {leftImage ? (
              <img 
                src={leftImage.url} 
                alt={leftImage.name} 
                className="w-full h-full object-contain pointer-events-none"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 bg-dark-900">
                No Before Image
              </div>
            )}
            <div className="absolute top-4 left-4 bg-dark-900/80 backdrop-blur-md text-amber-400 px-3 py-1 rounded-lg text-xs font-semibold border border-amber-500/30 shadow-lg">
              BEFORE
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 h-full flex items-center justify-center overflow-hidden relative bg-dark-900/50 rounded-2xl border border-slate-700/60 shadow-xl">
        <div 
          className="relative transition-transform duration-75 ease-out"
          style={{
            width: `${w}px`,
            height: `${h}px`,
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <div className="absolute inset-0 w-full h-full bg-dark-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700/50">
            {rightImage ? (
              <img 
                src={rightImage.url} 
                alt={rightImage.name} 
                className="w-full h-full object-contain pointer-events-none"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 bg-dark-900">
                No After Image
              </div>
            )}
            <div className="absolute top-4 right-4 bg-dark-900/80 backdrop-blur-md text-sky-400 px-3 py-1 rounded-lg text-xs font-semibold border border-sky-500/30 shadow-lg">
              AFTER
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
