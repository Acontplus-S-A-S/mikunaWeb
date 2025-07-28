import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="nosotros" className="section-padding bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/37b870c6-b03e-42b3-bd10-1fca720a0822/3a0c64c121b741511bad1dbcb51b811e.jpg"
              alt="Interior de MIKUNA CAFETERIA"
              className="w-full h-auto object-cover rounded-lg shadow-2xl"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="section-subtitle">Nuestra Historia</p>
            <h2 className="section-title mb-6">
              Proveedores de Café Orgánico y Fresco
            </h2>
            <p className="text-lg text-stone-600 mb-6 leading-relaxed">
              En MIKUNA, cada taza cuenta una historia. Inspirados en la riqueza del Amazonas, hemos creado un espacio donde la tradición se encuentra con la innovación.
            </p>
            <p className="text-stone-600 mb-8 leading-relaxed">
              Nuestro compromiso es ofrecerte no solo productos de la más alta calidad, sino una experiencia que despierte todos tus sentidos. Desde nuestros cafés de especialidad hasta nuestros platos orgánicos, todo está pensado para brindarte momentos únicos de paz y felicidad.
            </p>
            <img  alt="Firma del fundador" className="h-16" src="https://images.unsplash.com/photo-1700669431560-946f661c0484" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;