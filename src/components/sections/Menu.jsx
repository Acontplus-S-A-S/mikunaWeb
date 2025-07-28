import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import { PlusCircle } from 'lucide-react';

const menuData = {
  "Desayunos": [
    { id: 1, name: "Desayuno Amazónico", description: "Huevos, plátano, yuca y café", price: 8.50, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8" },
    { id: 2, name: "Tostadas Mikuna", description: "Pan artesanal con mermelada de cacao", price: 6.00, image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/3ff21d64d4a6558674b2f9f3e7d0d8c7.webp" },
    { id: 3, name: "Bowl de Açaí", description: "Açaí con frutas tropicales y granola", price: 9.00, image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85" }
  ],
  "Platos Principales": [
    { id: 4, name: "Pescado a la Plancha", description: "Pescado fresco con vegetales amazónicos", price: 15.00, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2" },
    { id: 5, name: "Pollo al Curry Verde", description: "Pollo en salsa de hierbas amazónicas", price: 13.50, image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/b70baf0e9e392a93ce357385c4576c11.webp" },
    { id: 6, name: "Ensalada Tropical", description: "Mix de hojas verdes con frutas exóticas", price: 11.00, image: "https://images.unsplash.com/photo-1540420773420-2850a42b2456" }
  ],
  "Cafés y Bebidas": [
    { id: 7, name: "Café Mikuna Especial", description: "Blend exclusivo de granos amazónicos", price: 4.50, image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/2efec85d3866e61cd8d0b6f60b037637.webp" },
    { id: 8, name: "Latte de Cacao", description: "Espresso con leche y cacao orgánico", price: 5.00, image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/db45ede3210a9165ac3ed3f3f84e3fe6.webp" },
    { id: 9, name: "Jugo Verde Detox", description: "Espinaca, piña, apio y jengibre", price: 6.50, image: "https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/60dabba9302cc5226c42c1a4a6d685cf.webp" }
  ]
};

const Menu = () => {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState(Object.keys(menuData)[0]);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast({
      title: "¡Añadido al carrito!",
      description: `${item.name} ha sido añadido a tu pedido.`,
    });
  };

  return (
    <section id="menu" className="section-padding bg-stone-100 dotted-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="section-subtitle">Nuestro Menú</p>
          <h2 className="section-title">Descubre nuestros sabores</h2>
        </motion.div>

        <div className="flex justify-center mb-12 border-b border-stone-300">
          {Object.keys(menuData).map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-3 font-semibold text-lg transition-colors duration-300 relative ${
                activeTab === category ? 'text-amber-600' : 'text-stone-500 hover:text-amber-600'
              }`}
            >
              {category}
              {activeTab === category && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-amber-600"
                  layoutId="underline"
                />
              )}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuData[activeTab].map(item => (
            <motion.div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/20"></div>
                <Button 
                  size="icon"
                  variant="ghost"
                  onClick={() => handleAddToCart(item)}
                  className="absolute top-2 right-2 bg-white/80 rounded-full text-amber-600 hover:bg-white"
                >
                  <PlusCircle />
                </Button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-serif text-xl font-semibold text-stone-800">{item.name}</h4>
                  <span className="text-xl font-semibold text-amber-600">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-stone-500 text-sm mt-1">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;