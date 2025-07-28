import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ShoppingCartIcon from '@/components/ShoppingCartIcon';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import ReservationModal from '@/components/ReservationModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <Dialog>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-stone-50/90 backdrop-blur-lg shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('inicio')}
            >
              <span className="font-serif text-2xl font-bold text-stone-800">MIKUNA</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {['inicio', 'nosotros', 'menu', 'galeria', 'testimonios', 'contacto'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="capitalize font-medium text-stone-600 hover:text-amber-600 transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <ShoppingCartIcon />
              </div>
              <DialogTrigger asChild>
                <button className="hidden md:block btn-primary !px-6 !py-2">
                  Reservar
                </button>
              </DialogTrigger>
              <div className="md:hidden">
                <ShoppingCartIcon />
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-stone-700 hover:text-amber-600 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <motion.div 
              className="md:hidden bg-white shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {['inicio', 'nosotros', 'menu', 'galeria', 'testimonios', 'contacto'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left py-2 px-3 capitalize font-medium text-stone-700 hover:text-amber-600 hover:bg-stone-100 rounded transition-colors"
                  >
                    {item}
                  </button>
                ))}
                <DialogTrigger asChild>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-left py-2 px-3 capitalize font-medium text-amber-600 bg-amber-100 rounded transition-colors mt-2"
                  >
                    Reservar
                  </button>
                </DialogTrigger>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
      <ReservationModal />
    </Dialog>
  );
};

export default Header;