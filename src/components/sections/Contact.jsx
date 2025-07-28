import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Formulario no funcional",
      description: "La funcionalidad de envío de formulario no está implementada todavía.",
    });
  };

  return (
    <section id="contacto" className="section-padding bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="section-subtitle">Contacto</p>
          <h2 className="section-title">Visítanos o escríbenos</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 text-amber-600 p-4 rounded-full"><MapPin size={24} /></div>
              <div>
                <h3 className="font-serif text-xl font-semibold">Dirección</h3>
                <p className="text-stone-600">Av. Amazonas 123, Quito, Ecuador</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 text-amber-600 p-4 rounded-full"><Clock size={24} /></div>
              <div>
                <h3 className="font-serif text-xl font-semibold">Horarios</h3>
                <p className="text-stone-600">Lun - Dom: 7:00 AM - 9:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 text-amber-600 p-4 rounded-full"><Phone size={24} /></div>
              <div>
                <h3 className="font-serif text-xl font-semibold">Teléfono</h3>
                <p className="text-stone-600">+593 2 123-4567</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Nombre</label>
                <input type="text" className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" placeholder="tu@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Mensaje</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none" placeholder="Tu mensaje..."></textarea>
              </div>
              <Button type="submit" className="btn-primary w-full">Enviar Mensaje</Button>
            </form>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-stone-200 h-80 flex items-center justify-center">
            <div className="text-center text-stone-500">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg font-medium">Mapa de Google Maps</p>
              <p className="text-sm">Ubicación de MIKUNA CAFETERIA</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;