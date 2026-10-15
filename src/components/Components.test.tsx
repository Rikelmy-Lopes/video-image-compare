import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DropZone } from './DropZone';
import { StatusBar } from './StatusBar';
import { Header } from './Header';
import { useStore } from '../store/useStore';

describe('Component tests', () => {
  beforeEach(() => {
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

  it('DropZone renders correctly and loads demo images on button click', () => {
    render(<DropZone />);
    expect(screen.getByText('Media Comparison Workspace')).toBeInTheDocument();
    expect(screen.getByText('Load Sample Demo Project')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Load Sample Demo Project'));
    const state = useStore.getState();
    expect(state.leftImage).not.toBeNull();
    expect(state.rightImage).not.toBeNull();
  });

  it('StatusBar displays "No image" when no images are loaded', () => {
    render(<StatusBar />);
    expect(screen.getAllByText('No image').length).toBeGreaterThanOrEqual(1);
  });

  it('StatusBar displays image details when images are present', () => {
    useStore.setState({
      leftImage: { name: 'before.png', url: 'blob:1', width: 800, height: 600 },
      rightImage: { name: 'after.png', url: 'blob:2', width: 800, height: 600 },
    });

    render(<StatusBar />);
    expect(screen.getByText(/before\.png/i)).toBeInTheDocument();
    expect(screen.getByText(/after\.png/i)).toBeInTheDocument();
  });

  it('Header renders title and upload buttons', () => {
    render(<Header />);
    expect(screen.getByText('Media Comparer Pro')).toBeInTheDocument();
    expect(screen.getByText('Upload Before')).toBeInTheDocument();
    expect(screen.getByText('Upload After')).toBeInTheDocument();
  });
});
