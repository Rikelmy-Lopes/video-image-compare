import React, { useRef, useCallback } from 'react';
import { useStore } from '../store/useStore';
import { MoveHorizontal } from 'lucide-react';

export const SplitViewer: React.FC = () => {
  const { leftImage, rightImage, splitPosition, setSplitPosition, scale, position } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const isDraggingSlider = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    isDraggingSlider.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingSlider.current || !imageWrapperRef.current) return;
    const rect = imageWrapperRef.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (localX / rect.width) * 100));
    setSplitPosition(percentage);
  }, [setSplitPosition]);

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingSlider.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const defaultWidth = 1200;
  const defaultHeight = 800;

  const w = leftImage?.width || rightImage?.width || defaultWidth;
  const h = leftImage?.height || rightImage?.height || defaultHeight;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden select-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Transform wrapper for synchronized zoom & pan */}
      <div 
        ref={imageWrapperRef}
        className="relative"
        style={{
          width: `${w}px`,
          height: `${h}px`,
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Background Layer: Right Image (After) */}
        <div className="absolute inset-0 w-full h-full bg-dark-800 rounded-lg shadow-2xl overflow-hidden border border-slate-700/50">
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

        {/* Overlay Layer: Left Image (Before) with clip-path */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-lg"
          style={{
            clipPath: `inset(0 ${100 - splitPosition}% 0 0)`
          }}
        >
          <div className="absolute inset-0 w-full h-full bg-dark-800">
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

        {/* Interactive Split Divider Bar */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-sky-400 cursor-ew-resize z-20 group"
          style={{ left: `${splitPosition}%` }}
          onPointerDown={handlePointerDown}
        >
          <div 
            className="absolute top-1/2 left-1/2 w-8 h-12 bg-sky-500 hover:bg-sky-400 text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white cursor-ew-resize"
            style={{
              transform: `translate(-50%, -50%) scale(${1 / scale})`,
              transformOrigin: 'center center',
            }}
          >
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
