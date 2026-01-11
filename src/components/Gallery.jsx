import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './Gallery.css';

const images = [
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1530103862676-de3c9a59af38?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1531590878845-12627191e687?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1000&auto=format&fit=crop'
];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section className="gallery-section">
            <h2 className="gallery-title">Memories</h2>

            <div className="gallery-grid">
                {images.map((src, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="gallery-item"
                        onClick={() => setSelectedImage(src)}
                        layoutId={`image-${src}`}
                    >
                        <img src={src} alt={`Birthday memory ${index + 1}`} loading="lazy" />
                        <div className="gallery-overlay">
                            <span>View</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lightbox"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="lightbox-content"
                            layoutId={`image-${selectedImage}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={selectedImage} alt="Full size" />
                            <button className="close-btn" onClick={() => setSelectedImage(null)}>
                                <X size={24} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
