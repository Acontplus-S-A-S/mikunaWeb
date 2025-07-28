import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Hero = () => {
  const { setIsCartOpen } = useCart();

  const handleComprarAhora = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      setIsCartOpen(true);
    }, 800);
  };

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/70b0cd6962f5cd3e4de35f0b754a0dc6.webp"
          alt="Ambiente acogedor de MIKUNA CAFETERIA"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 px-4">
        <motion.p 
          className="font-serif text-2xl md:text-3xl mb-4 text-amber-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Bienvenido a MIKUNA
        </motion.p>
        
        <motion.h1 
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Una nueva forma de ver el café
        </motion.h1>
        
        <motion.p 
          className="max-w-2xl mx-auto text-lg md:text-xl text-stone-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Descubre un viaje de sabores en cada bocado, donde la pasión por el café se une con la magia del Amazonas.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button onClick={scrollToMenu} className="btn-primary">Nuestro Menú</button>
          <button onClick={handleComprarAhora} className="btn-secondary !text-white !border-white hover:!bg-white hover:!text-stone-900">Comprar Ahora</button>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' })}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
};

export default Hero;