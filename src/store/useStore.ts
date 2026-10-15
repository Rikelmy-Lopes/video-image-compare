import { create } from 'zustand';
import { createSampleImage } from '../utils/sampleImages';

export interface ImageData {
  name: string;
  url: string;
  width: number;
  height: number;
  size?: number;
}

export type ComparisonMode = 'split' | 'side-by-side';

interface State {
  leftImage: ImageData | null;
  rightImage: ImageData | null;
  comparisonMode: ComparisonMode;
  splitPosition: number; // 0 - 100
  scale: number;
  position: { x: number; y: number };
  isDragging: boolean;
  dragStart: { x: number; y: number };

  // Actions
  setLeftImage: (image: ImageData | null) => void;
  setRightImage: (image: ImageData | null) => void;
  setComparisonMode: (mode: ComparisonMode) => void;
  setSplitPosition: (pos: number) => void;
  setScale: (scale: number | ((prevScale: number) => number)) => void;
  setPosition: (pos: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void;
  setIsDragging: (isDragging: boolean) => void;
  setDragStart: (dragStart: { x: number; y: number }) => void;
  resetView: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  loadDemoImages: () => void;
  swapImages: () => void;
}

export const useStore = create<State>((set, get) => ({
  leftImage: null,
  rightImage: null,
  comparisonMode: 'split',
  splitPosition: 50,
  scale: 1,
  position: { x: 0, y: 0 },
  isDragging: false,
  dragStart: { x: 0, y: 0 },

  setLeftImage: (leftImage) => set({ leftImage }),
  setRightImage: (rightImage) => set({ rightImage }),
  setComparisonMode: (comparisonMode) => set({ comparisonMode }),
  setSplitPosition: (splitPosition) => set({ splitPosition }),
  
  setScale: (scaleArg) => {
    const currentScale = get().scale;
    const newScale = typeof scaleArg === 'function' ? scaleArg(currentScale) : scaleArg;
    // Clamp scale between 0.1 and 10
    const clamped = Math.max(0.1, Math.min(10, newScale));
    set({ scale: clamped });
  },

  setPosition: (posArg) => {
    const currentPos = get().position;
    const newPos = typeof posArg === 'function' ? posArg(currentPos) : posArg;
    set({ position: newPos });
  },

  setIsDragging: (isDragging) => set({ isDragging }),
  setDragStart: (dragStart) => set({ dragStart }),

  resetView: () => set({ scale: 1, position: { x: 0, y: 0 }, splitPosition: 50 }),

  zoomIn: () => {
    const { scale, position } = get();
    const next = Math.min(10, scale * 1.25);
    const effectiveFactor = next / scale;
    set({ 
      scale: next, 
      position: { 
        x: position.x * effectiveFactor, 
        y: position.y * effectiveFactor 
      } 
    });
  },

  zoomOut: () => {
    const { scale, position } = get();
    const next = Math.max(0.1, scale / 1.25);
    const effectiveFactor = next / scale;
    set({ 
      scale: next, 
      position: { 
        x: position.x * effectiveFactor, 
        y: position.y * effectiveFactor 
      } 
    });
  },

  loadDemoImages: () => {
    const leftUrl = createSampleImage('V1.0 Architecture UI', 'Original Design Draft', true);
    const rightUrl = createSampleImage('V2.0 Architecture UI', 'Optimized Dark UI & Glow', false);

    set({
      leftImage: {
        name: 'v1-architecture-original.svg',
        url: leftUrl,
        width: 1200,
        height: 800,
        size: 245000,
      },
      rightImage: {
        name: 'v2-architecture-optimized.svg',
        url: rightUrl,
        width: 1200,
        height: 800,
        size: 289000,
      },
      scale: 1,
      position: { x: 0, y: 0 },
      splitPosition: 50,
    });
  },

  swapImages: () => {
    const { leftImage, rightImage } = get();
    set({ leftImage: rightImage, rightImage: leftImage });
  },
}));
