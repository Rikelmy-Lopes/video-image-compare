import React, { useRef, useCallback } from 'react';
import { useStore } from '../store/useStore';
import { SplitViewer } from './SplitViewer';
import { SideBySideViewer } from './SideBySideViewer';

export const ViewerContainer: React.FC = () => {
  const { 
    comparisonMode, 
    scale, 
    setScale, 
    position, 
    setPosition, 
    isDragging, 
    setIsDragging, 
    dragStart, 
    setDragStart 
  } = useStore();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
    const rawNewScale = scale * zoomFactor;
    const newScale = Math.max(0.1, Math.min(10, rawNewScale));
    const effectiveFactor = newScale / scale;

    const newX = mouseX - (mouseX - position.x) * effectiveFactor;
    const newY = mouseY - (mouseY - position.y) * effectiveFactor;

    setScale(newScale);
    setPosition({ x: newX, y: newY });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only left click or touch
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  }, [isDragging, dragStart, setPosition]);

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div 
      ref={containerRef}
      className="flex-1 relative overflow-hidden bg-dark-900 cursor-grab active:cursor-grabbing flex items-center justify-center"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {comparisonMode === 'split' ? <SplitViewer /> : <SideBySideViewer />}
    </div>
  );
};
