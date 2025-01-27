'use client';

import { useCart } from '@/components/cart-provider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { products } from '@/lib/data';
import { ShoppingCart, Store, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const { addItem, items } = useCart();
  const product = products.find((p) => p.id === params.id);
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button
          onClick={() => router.push('/')}
          className="bg-cyan-400 text-black hover:bg-cyan-500"
        >
          Back to Home
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
          <Button
            onClick={() => router.push('/cart')}
            className="bg-cyan-400 text-black hover:bg-cyan-500"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cart ({cartItemCount})
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-6 text-pink-500 hover:text-pink-400"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-4xl mx-auto bg-gray-900 border-pink-500">
            <div className="grid md:grid-cols-2 gap-8 p-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-[400px]"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl font-bold text-pink-500 mb-2">{product.name}</h1>
                  <p className="text-gray-400">{product.description}</p>
                </div>
                <div className="text-2xl font-bold text-cyan-400">
                  ${product.price.toFixed(2)}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">
                    Category: <span className="text-pink-500">{product.category}</span>
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    Stock: {product.stock} units available
                  </p>
                  <Button
                    className="w-full bg-cyan-400 text-black hover:bg-cyan-500"
                    onClick={() => {
                      addItem(product);
                      toast({
                        title: 'Added to cart',
                        description: `${product.name} has been added to your cart`,
                      });
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}