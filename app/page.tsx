'use client';

import { ProductCard } from '@/components/ui/product-card';
import { products, categories } from '@/lib/data';
import { useCart } from '@/components/cart-provider';
import { ShoppingCart, Store, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const { addItem, items } = useCart();
  const router = useRouter();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-pink-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
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

      <section className="relative h-[70vh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1580442151529-343f2f6e0e27"
          alt="Japanese convenience store at night"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center space-y-6 p-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
            className=" font-pressStart text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-transparent bg-clip-text"
          >
            Welcome to Little Kobe
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Your one-stop shop for authentic Japanese groceries and snacks
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <Button
              onClick={() => {
                const productsSection = document.getElementById('products');
                productsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-cyan-400 text-black hover:bg-cyan-500"
            >
              Shop Now
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-pink-500 to-cyan-400 text-transparent bg-clip-text"
        >
          Shop by Category
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => {
                const productsSection = document.getElementById('products');
                productsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="relative h-64">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-gray-200">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="products" className="container mx-auto py-16 px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-transparent bg-clip-text"
        >
          Featured Products
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard
                product={product}
                onAddToCart={addItem}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}