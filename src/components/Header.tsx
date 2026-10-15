import React, { useRef } from 'react';
import { 
  SlidersHorizontal, 
  Columns, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ArrowLeftRight, 
  Sparkles,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const Header: React.FC = () => {
  const { 
    leftImage, 
    rightImage, 
    comparisonMode, 
    scale, 
    setComparisonMode, 
    zoomIn, 
    zoomOut, 
    resetView, 
    loadDemoImages, 
    swapImages,
    setLeftImage,
    setRightImage 
  } = useStore();

  const leftInputRef = useRef<HTMLInputElement>(null);
  const rightInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isLeft: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

  return (
    <header className="bg-dark-800 border-b border-slate-700/60 px-4 py-2.5 flex items-center justify-between select-none z-30 shadow-lg">
      {/* Brand & Title */}
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-tr from-sky-500 to-indigo-600 p-2 rounded-xl shadow-md text-white flex items-center justify-center">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-base text-slate-100 tracking-tight flex items-center gap-2">
            Media Comparer Pro
            <span className="text-[10px] bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded-full border border-sky-500/30 font-medium">v2.0</span>
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block">Synchronized Before/After & Side-by-Side Analysis</p>
        </div>
      </div>

      {/* Center Toolbar / Actions */}
      {(leftImage || rightImage) && (
        <div className="flex items-center space-x-2 bg-dark-900/80 p-1.5 rounded-xl border border-slate-700/70 shadow-inner">
          {/* Comparison Mode Switcher */}
          <div className="flex bg-dark-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setComparisonMode('split')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                comparisonMode === 'split'
                  ? 'bg-sky-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title="Split Slider Comparison"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Split Slider</span>
            </button>
            <button
              onClick={() => setComparisonMode('side-by-side')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                comparisonMode === 'side-by-side'
                  ? 'bg-sky-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title="Side-by-Side Comparison"
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Side-by-Side</span>
            </button>
          </div>

          <div className="h-5 w-px bg-slate-700 mx-1" />

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1">
            <button
              onClick={zoomOut}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-300 w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomIn}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={resetView}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors ml-1"
              title="Reset View (Fit & Center)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="h-5 w-px bg-slate-700 mx-1 hidden sm:block" />

          {/* Swap Images */}
          <button
            onClick={swapImages}
            className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 bg-dark-700 hover:bg-dark-600 text-slate-200 rounded-lg text-xs font-medium transition-colors border border-slate-600"
            title="Swap Before / After positions"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-sky-400" />
            <span>Swap</span>
          </button>
        </div>
      )}

      {/* Right Side Controls (Upload & Demo) */}
      <div className="flex items-center space-x-2">
        <input 
          type="file" 
          ref={leftInputRef} 
          onChange={(e) => handleFileChange(e, true)} 
          accept="image/png,image/jpeg,image/jpg,image/webp,image/avif,image/gif" 
          className="hidden" 
        />
        <input 
          type="file" 
          ref={rightInputRef} 
          onChange={(e) => handleFileChange(e, false)} 
          accept="image/png,image/jpeg,image/jpg,image/webp,image/avif,image/gif" 
          className="hidden" 
        />

        <button
          onClick={() => leftInputRef.current?.click()}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-medium transition-colors border border-slate-600 shadow-sm"
          title="Load Before Image"
        >
          <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Upload Before</span>
        </button>

        <button
          onClick={() => rightInputRef.current?.click()}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-medium transition-colors border border-slate-600 shadow-sm"
          title="Load After Image"
        >
          <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Upload After</span>
        </button>

        <button
          onClick={loadDemoImages}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-lg text-xs font-medium transition-all shadow-md shadow-sky-900/30"
          title="Load Sample Demo Files"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden md:inline">Load Demo</span>
        </button>
      </div>
    </header>
  );
};
