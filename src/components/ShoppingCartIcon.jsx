import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const ShoppingCartIcon = () => {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <Button 
      variant="ghost" 
      size="icon"
      className="relative" 
      onClick={() => setIsCartOpen(true)}
    >
      <ShoppingBag className="h-6 w-6 text-stone-600 hover:text-amber-600" />
      {cartCount > 0 && (
        <motion.span 
          className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        >
          {cartCount}
        </motion.span>
      )}
    </Button>
  );
};

export default ShoppingCartIcon;