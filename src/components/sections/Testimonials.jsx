import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "María González",
    text: "El mejor café de la ciudad. El ambiente es acogedor y la comida deliciosa. ¡Volveré sin duda!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Carlos Mendoza",
    text: "Una experiencia única. Los sabores amazónicos son increíbles y el servicio excepcional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Ana Rodríguez",
    text: "Mi lugar favorito para desayunar. El café es espectacular y el ambiente muy relajante.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonios" className="section-padding bg-stone-100 dotted-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="section-subtitle">Testimonios</p>
          <h2 className="section-title">Lo que dicen nuestros clientes</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.name}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Quote className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <p className="text-stone-600 italic leading-relaxed mb-6">"{testimonial.text}"</p>
              <img 
                src={testimonial.image} 
                alt={`${testimonial.name} - Cliente satisfecho`}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border-4 border-amber-200"
              />
              <h4 className="font-serif text-xl font-semibold text-stone-800">{testimonial.name}</h4>
              <div className="flex justify-center mt-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;