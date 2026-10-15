import { useEffect } from 'react';
import { Header } from './components/Header';
import { ViewerContainer } from './components/ViewerContainer';
import { DropZone } from './components/DropZone';
import { StatusBar } from './components/StatusBar';
import { useStore } from './store/useStore';

export function App() {
  const { leftImage, rightImage, loadDemoImages } = useStore();

  // Auto load demo images on mount for immediate out-of-the-box delight
  useEffect(() => {
    if (!leftImage && !rightImage) {
      loadDemoImages();
    }
  }, [leftImage, rightImage, loadDemoImages]);

  const hasImages = leftImage || rightImage;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-dark-900 font-sans">
      <Header />
      {hasImages ? <ViewerContainer /> : <DropZone />}
      <StatusBar />
    </div>
  );
}

export default App;
