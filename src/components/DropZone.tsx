import React, { useRef } from 'react';
import { Sparkles, Image as ImageIcon, Layers } from 'lucide-react';
import { useStore } from '../store/useStore';

export const DropZone: React.FC = () => {
  const { setLeftImage, setRightImage, loadDemoImages } = useStore();
  const leftInputRef = useRef<HTMLInputElement>(null);
  const rightInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File, isLeft: boolean) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const imageData = {
        name: file.name,
        url,
        width: img.naturalWidth,
        height: img.naturalHeight,
        size: file.size,
      };
      if (isLeft) {
        setLeftImage(imageData);
      } else {
        setRightImage(imageData);
      }
    };
    img.src = url;
  };

  const handleDrop = (e: React.DragEvent, isLeft: boolean) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file, isLeft);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-dark-900 overflow-y-auto">
      <div className="max-w-2xl w-full bg-dark-800/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden backdrop-blur-md">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex p-4 bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 rounded-2xl text-sky-400 mb-5 border border-sky-500/30 shadow-inner">
          <Layers className="w-10 h-10" />
        </div>

        <h2 className="text-2xl font-bold text-slate-100 mb-2">Media Comparison Workspace</h2>
        <p className="text-sm text-slate-400 mb-8 max-w-md mx-auto">
          Compare two images side-by-side or with an interactive Before/After split slider. Load your own files or try the instant demo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Before Slot */}
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, true)}
            onClick={() => leftInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 hover:border-amber-500/60 bg-dark-900/60 hover:bg-dark-900 rounded-2xl p-6 transition-all cursor-pointer flex flex-col items-center justify-center group"
          >
            <input 
              type="file" 
              ref={leftInputRef} 
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], true)} 
              accept="image/*" 
              className="hidden" 
            />
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 mb-3 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-6 h-6" />
            </div>
            <span className="font-semibold text-slate-200 text-sm mb-1">Load "Before" Image</span>
            <span className="text-xs text-slate-400">Drag & drop or click to browse</span>
          </div>

          {/* After Slot */}
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, false)}
            onClick={() => rightInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 hover:border-sky-500/60 bg-dark-900/60 hover:bg-dark-900 rounded-2xl p-6 transition-all cursor-pointer flex flex-col items-center justify-center group"
          >
            <input 
              type="file" 
              ref={rightInputRef} 
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], false)} 
              accept="image/*" 
              className="hidden" 
            />
            <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400 mb-3 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-6 h-6" />
            </div>
            <span className="font-semibold text-slate-200 text-sm mb-1">Load "After" Image</span>
            <span className="text-xs text-slate-400">Drag & drop or click to browse</span>
          </div>
        </div>

        {/* Demo Button */}
        <div className="pt-2 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 text-left">
            Supports PNG, JPG, WEBP, AVIF, GIF formats.
          </div>
          <button
            onClick={loadDemoImages}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-sky-900/40 hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Load Sample Demo Project</span>
          </button>
        </div>
      </div>
    </div>
  );
};
