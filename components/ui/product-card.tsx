'use client';

import { Product } from '@/lib/types';
import { Card } from './card';
import Image from 'next/image';
import { Button } from './button';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden bg-gray-900 border-pink-500">
        <div className="relative h-48">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-pink-500 mb-2">{product.name}</h3>
          <p className="text-gray-400 text-sm mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-cyan-400 font-bold">${product.price.toFixed(2)}</span>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Details
              </Button>
              <Button
                size="sm"
                className="bg-cyan-400 text-black hover:bg-cyan-500"
                onClick={() => onAddToCart(product)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}