
import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/CartContext';

import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Menu from '@/components/sections/Menu';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import Reservation from '@/components/sections/Reservation';

function App() {
  return (
    <CartProvider>
      <Helmet>
        <title>MIKUNA CAFETERIA - Cafetería Amazónica | Amor, Paz y Café</title>
        <meta name="description" content="Descubre MIKUNA CAFETERIA, tu rincón de sabor amazónico. Disfruta de café de especialidad, comida orgánica y un ambiente único. Amor, Paz y Café en cada experiencia." />
      </Helmet>

      <div className="bg-stone-50 text-stone-800">
        <Header />
        <main>
          <Hero />
          <About />
          <Menu />
          <Reservation />
          <Gallery />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <ShoppingCart />
        <Toaster />
      </div>
    </CartProvider>
  );
}

export default App;
