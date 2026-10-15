import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from './useStore';

describe('useStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useStore.setState({
      leftImage: null,
      rightImage: null,
      comparisonMode: 'split',
      splitPosition: 50,
      scale: 1,
      position: { x: 0, y: 0 },
      isDragging: false,
      dragStart: { x: 0, y: 0 },
    });
  });

  it('should initialize with default state', () => {
    const state = useStore.getState();
    expect(state.leftImage).toBeNull();
    expect(state.rightImage).toBeNull();
    expect(state.comparisonMode).toBe('split');
    expect(state.splitPosition).toBe(50);
    expect(state.scale).toBe(1);
    expect(state.position).toEqual({ x: 0, y: 0 });
  });

  it('should set left and right images', () => {
    const imgData = { name: 'test.png', url: 'blob:test', width: 100, height: 100 };
    useStore.getState().setLeftImage(imgData);
    expect(useStore.getState().leftImage).toEqual(imgData);

    useStore.getState().setRightImage(imgData);
    expect(useStore.getState().rightImage).toEqual(imgData);
  });

  it('should change comparison mode', () => {
    useStore.getState().setComparisonMode('side-by-side');
    expect(useStore.getState().comparisonMode).toBe('side-by-side');
  });

  it('should update split position', () => {
    useStore.getState().setSplitPosition(75);
    expect(useStore.getState().splitPosition).toBe(75);
  });

  it('should handle scaling and clamping', () => {
    useStore.getState().setScale(5);
    expect(useStore.getState().scale).toBe(5);

    // Test upper clamp (max 10)
    useStore.getState().setScale(15);
    expect(useStore.getState().scale).toBe(10);

    // Test lower clamp (min 0.1)
    useStore.getState().setScale(0.05);
    expect(useStore.getState().scale).toBe(0.1);
  });

  it('should zoom in and out', () => {
    useStore.getState().resetView();
    expect(useStore.getState().scale).toBe(1);

    useStore.getState().zoomIn();
    expect(useStore.getState().scale).toBeCloseTo(1.25);

    useStore.getState().zoomOut();
    expect(useStore.getState().scale).toBe(1);
  });

  it('should load demo images', () => {
    useStore.getState().loadDemoImages();
    const state = useStore.getState();
    expect(state.leftImage).not.toBeNull();
    expect(state.rightImage).not.toBeNull();
    expect(state.leftImage?.name).toContain('v1-architecture-original.svg');
    expect(state.rightImage?.name).toContain('v2-architecture-optimized.svg');
  });

  it('should swap images', () => {
    const img1 = { name: '1.png', url: 'url1', width: 100, height: 100 };
    const img2 = { name: '2.png', url: 'url2', width: 200, height: 200 };

    useStore.setState({ leftImage: img1, rightImage: img2 });
    useStore.getState().swapImages();

    expect(useStore.getState().leftImage).toEqual(img2);
    expect(useStore.getState().rightImage).toEqual(img1);
  });
});
