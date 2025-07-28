import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Footer = () => {
  const handleSocialClick = () => {
    toast({
      title: "🚧 Esta función aún no está implementada",
      description: "¡Pero no te preocupes! Puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-stone-800 text-stone-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-bold text-white mb-4">MIKUNA</h3>
            <p className="text-stone-400 leading-relaxed">
              Un refugio de sabor y paz, inspirado en la riqueza del Amazonas.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces</h4>
            <ul className="space-y-2">
              {['inicio', 'nosotros', 'menu', 'contacto'].map(item => (
                <li key={item}>
                  <button onClick={() => scrollToSection(item)} className="hover:text-amber-400 transition-colors capitalize">{item}</button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <div className="space-y-2 text-stone-400">
              <p>Av. Amazonas 123, Quito</p>
              <p>hola@mikunacafe.com</p>
              <p>+593 2 123-4567</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <button onClick={handleSocialClick} className="hover:text-amber-400 transition-colors"><Instagram /></button>
              <button onClick={handleSocialClick} className="hover:text-amber-400 transition-colors"><Facebook /></button>
              <button onClick={handleSocialClick} className="hover:text-amber-400 transition-colors"><Twitter /></button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-stone-700 pt-8 mt-8 text-center text-stone-500">
          <p>&copy; {new Date().getFullYear()} MIKUNA CAFETERIA. Diseñado con ❤️ por Hostinger Horizons.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;