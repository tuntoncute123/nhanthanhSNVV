import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import PhotoBook from './components/PhotoBook';
import ThemeDecorations from './components/ThemeDecorations';
import { Music } from 'lucide-react';
import './App.css';

// Import Images from Assets
import Img1 from './assets/473070012_1740558580057774_5239471001285401567_n.jpg';
import Img2 from './assets/484454819_1787555022024796_4972958348730029276_n_cleanup.jpg';
import Img3 from './assets/498225368_661468486727573_3295657091496065542_n.jpg';
import Img4 from './assets/z7382237923179_018ea54c6f6972b382f011c9793dbe61.jpg';
import Img5 from './assets/z7382238993474_36e0efffa2ba24b798e8f488365bb7fc.jpg';
import Img6 from './assets/Screenshot 2025-11-11 173229.png';

const images = [Img1, Img2, Img3, Img4, Img5, Img6];

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBook, setShowBook] = useState(false);

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

      {/* Actual audio element */}
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/audio/2023/01/24/audio_34b6e5113d.mp3" type="audio/mpeg" />
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
              <PhotoBook images={images} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="footer">
        <p>Made with ❤️ for Thanh Nhan</p>
      </footer>
    </div>
  );
}

export default App;
