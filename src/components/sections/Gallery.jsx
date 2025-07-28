import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X } from 'lucide-react';

const galleryImages = [
  "https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/5fb4d4995c519cefb8cfc601cffdeaed.webp",
  "https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/bf7c925e3fbdf6083b5463c59d6e556c.webp",
  "https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/70b0cd6962f5cd3e4de35f0b754a0dc6.webp",
  "https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/2efec85d3866e61cd8d0b6f60b037637.webp",
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="galeria" className="section-padding bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="section-subtitle">Galería</p>
          <h2 className="section-title">Momentos MIKUNA</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((src, index) => (
            <motion.div 
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => setSelectedImage(src)}
              layoutId={`gallery-image-${index}`}
            >
              <img  
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" 
                src={src}
                alt={`Momento especial en MIKUNA CAFETERIA ${index + 1}`}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Eye className="w-10 h-10 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Vista ampliada de la galería"
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            />
            <motion.button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
              onClick={() => setSelectedImage(null)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <X size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;