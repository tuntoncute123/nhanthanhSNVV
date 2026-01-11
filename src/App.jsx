import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import PhotoBook from './components/PhotoBook';
import ThemeDecorations from './components/ThemeDecorations';
import { Music } from 'lucide-react';
import './App.css';

// Import Images from Assets
// Import Images from Assets
import Img1 from './assets/memory_1.jpg';
import Img2 from './assets/memory_2.jpg';
import Img3 from './assets/memory_3.jpg';
import Img4 from './assets/memory_4.jpg';
import Img5 from './assets/memory_5.jpg';
import Img6 from './assets/memory_6.png';
import { Upload, Plus } from 'lucide-react';

const INITIAL_IMAGES = [Img1, Img2, Img3, Img4, Img5, Img6];

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const [images, setImages] = useState(INITIAL_IMAGES);
  const fileInputRef = useRef(null);

  // Load saved images from LocalStorage on mount
  React.useEffect(() => {
    const savedImages = localStorage.getItem('uploaded_memories');
    if (savedImages) {
      try {
        const parsed = JSON.parse(savedImages);
        setImages([...INITIAL_IMAGES, ...parsed]);
      } catch (e) {
        console.error("Failed to load images", e);
      }
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;

        // Update State
        const newImages = [...images, base64String];
        setImages(newImages);

        // Update LocalStorage (Only save the new additions, not the imports)
        // We filter out the initial images by slicing
        const currentUploaded = newImages.slice(INITIAL_IMAGES.length);
        try {
          localStorage.setItem('uploaded_memories', JSON.stringify(currentUploaded));
        } catch (error) {
          alert("Storage full! Cannot save more photos locally.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app-container">
      {/* Background Music Control */}
      <button
        className={`music-toggle ${isPlaying ? 'playing' : ''}`}
        onClick={toggleMusic}
        title="Play Birthday Music"
      >
        <Music size={20} />
      </button>

      {/* Upload Button */}
      {showBook && (
        <div className="upload-container">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button
            className="upload-btn"
            onClick={() => fileInputRef.current.click()}
            title="Add a Memory"
          >
            <Plus size={24} />
          </button>
        </div>
      )}

      {/* Actual audio element */}
      <audio ref={audioRef} loop>
        {/* Audio source removed to prevent 403 error */}
      </audio>

      {/* Theme Decorations (Elsa & Snow White) */}
      <ThemeDecorations />

      <main>
        <AnimatePresence mode="wait">
          {!showBook ? (
            <motion.div
              key="hero"
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onCelebrate={() => setShowBook(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="book"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="book-wrapper"
            >
              {/* Key forces re-render when image count changes to fix FlipBook layout */}
              <PhotoBook key={images.length} images={images} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="footer">
        <p>Made with ❤️ for Nhan Thanh</p>
      </footer>
    </div>
  );
}

export default App;
