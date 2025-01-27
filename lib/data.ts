import { Category, Product } from './types';

export const categories: Category[] = [
  {
    id: 'snacks',
    name: 'Snacks',
    description: 'Japanese snacks and candies',
    image: 'https://images.unsplash.com/photo-1461009683693-342af2f2d6ce'
  },
  {
    id: 'condiments',
    name: 'Condiments',
    description: 'Sauces, seasonings, and more',
    image: 'https://images.unsplash.com/photo-1590942109680-3cb3cc0731cc'
  },
  {
    id: 'rice',
    name: 'Rice',
    description: 'Premium Japanese rice varieties',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Pocky Matcha',
    description: 'Green tea flavored chocolate-coated biscuit sticks',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1561845730-208ad5910553',
    category: 'Snacks',
    stock: 50
  },
  {
    id: '2',
    name: 'Kikkoman Soy Sauce',
    description: 'Premium naturally brewed soy sauce',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1584671086350-c66bb0981837',
    category: 'Condiments',
    stock: 100
  },
  {
    id: '3',
    name: 'Nishiki Premium Rice',
    description: 'Medium grain sushi rice',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6',
    category: 'Rice',
    stock: 75
  }
];