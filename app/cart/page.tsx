'use client';

import { useCart } from '@/components/cart-provider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Minus, Plus, ShoppingCart, Store, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <ShoppingCart className="h-16 w-16 text-pink-500 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button
          onClick={() => router.push('/')}
          className="bg-cyan-400 text-black hover:bg-cyan-500"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-pink-500 p-4 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
            <Store className="h-8 w-8 text-pink-500" />
            <h1 className="text-2xl font-bold text-pink-500">Neon Konbini</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-cyan-400 text-transparent bg-clip-text"
        >
          Your Shopping Cart
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  layout
                >
                  <Card className="p-4 bg-gray-900 border-pink-500">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-pink-500">{item.name}</h3>
                        <p className="text-sm text-gray-400">{item.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 border-cyan-400 text-cyan-400"
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 border-cyan-400 text-cyan-400"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-cyan-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="lg:col-span-1">
            <Card className="p-6 bg-gray-900 border-pink-500 sticky top-4">
              <h3 className="text-xl font-bold mb-4 text-pink-500">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-700 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-cyan-400">${total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="w-full bg-cyan-400 text-black hover:bg-cyan-500"
                onClick={() => router.push('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}