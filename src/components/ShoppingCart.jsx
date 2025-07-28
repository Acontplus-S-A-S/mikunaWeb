import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { X, Trash2, Plus, Minus, ShoppingCart as ShoppingCartIcon, Send } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ShoppingCart = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const handleSendOrder = () => {
    if (!customerName || !customerEmail) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, ingresa tu nombre y correo electrónico.",
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        variant: "destructive",
        title: "Carrito vacío",
        description: "Agrega productos a tu carrito antes de enviar el pedido.",
      });
      return;
    }

    const orderDetails = cartItems.map(item => 
      `${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const emailBody = `
      Nuevo Pedido de MIKUNA CAFETERIA
      ---------------------------------
      Cliente: ${customerName}
      Email: ${customerEmail}
      ---------------------------------
      Pedido:
      ${orderDetails}
      ---------------------------------
      Total: $${cartTotal.toFixed(2)}
    `;

    const mailtoLink = `mailto:hola@mikunacafeteria.com?subject=Nuevo Pedido de ${customerName}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;

    toast({
      title: "¡Pedido enviado!",
      description: "Se abrirá tu cliente de correo para enviar el pedido. ¡Gracias por tu compra!",
    });

    clearCart();
    setIsCartOpen(false);
    setCustomerName('');
    setCustomerEmail('');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[99]"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-stone-50 shadow-2xl z-[100] flex flex-col"
          >
            <header className="flex items-center justify-between p-6 border-b border-stone-200">
              <h2 className="font-serif text-2xl font-bold text-stone-800">Tu Pedido</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                <X className="h-6 w-6 text-stone-600" />
              </Button>
            </header>

            <div className="flex-grow p-6 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-stone-500">
                  <ShoppingCartIcon className="w-16 h-16 mb-4" />
                  <p className="text-lg font-semibold">Tu carrito está vacío</p>
                  <p>¡Añade algunos productos del menú para empezar!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <motion.div 
                      key={item.id} 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm"
                    >
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                      <div className="flex-grow">
                        <p className="font-semibold text-stone-800">{item.name}</p>
                        <p className="text-sm text-stone-500">${item.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-amber-600">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 h-8 w-8" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <footer className="p-6 border-t border-stone-200 bg-white">
                <div className="space-y-4 mb-6">
                   <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Nombre</label>
                    <input 
                      type="text" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      placeholder="Tu nombre"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-amber-600">${cartTotal.toFixed(2)}</span>
                </div>
                <Button onClick={handleSendOrder} className="btn-primary w-full text-lg">
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Pedido por Email
                </Button>
              </footer>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;