import React from 'react';
import './produits.css';
import { Link } from 'react-router-dom';
import pic1 from './pic.png/pic1.jpeg';
import pic2 from './pic.png/pic2.jpeg';
import pic3 from './pic.png/pic3.jpeg';
import pic4 from './pic.png/pic4.jpeg';
import pic5 from './pic.png/pic5.jpeg';
import pic6 from './pic.png/pic6.jpeg';

export const produits = [
  {
    id: 1,
    name: 'Rode Mic',
    category: 'Audio',
    title: 'Wireless microphone for creators',
    price: 19.99,
    image: pic1,
    rating: 4.8,
    reviews: 128,
    description: 'A compact microphone designed for clear voice capture and mobile recording.',
    stock: 15,
  },
  {
    id: 2,
    name: 'Rode Mic Pro',
    category: 'Audio',
    title: 'Studio-grade microphone',
    price: 29.99,
    image: pic2,
    rating: 4.7,
    reviews: 96,
    description: 'Designed for streaming, podcasts, and professional voice recording with crisp detail.',
    stock: 12,
  },
  {
    id: 3,
    name: 'Rode Mic Air',
    category: 'Audio',
    title: 'Portable recording mic',
    price: 24.99,
    image: pic3,
    rating: 4.6,
    reviews: 82,
    description: 'Travel-friendly design with rich sound and easy setup for any recording need.',
    stock: 9,
  },
  {
    id: 4,
    name: 'Rode Mic Max',
    category: 'Audio',
    title: 'Premium creator microphone',
    price: 39.99,
    image: pic4,
    rating: 4.9,
    reviews: 143,
    description: 'High-performance audio capture for creators who want crisp, balanced sound.',
    stock: 7,
  },
  {
    id: 5,
    name: 'Rode Mic Mini',
    category: 'Audio',
    title: 'Compact on-the-go mic',
    price: 21.99,
    image: pic5,
    rating: 4.5,
    reviews: 64,
    description: 'A portable solution for meetings, voice notes, and short-form video production.',
    stock: 18,
  },
  {
    id: 6,
    name: 'Rode Mic Studio',
    category: 'Audio',
    title: 'Full-featured studio mic',
    price: 49.99,
    image: pic6,
    rating: 5,
    reviews: 205,
    description: 'A premium microphone built for expressive vocals and professional recordings.',
    stock: 5,
  },
];

function Product() {
  return (
    <div className='products'>
      {produits.map((p) => (
        <div key={p.id} className='product'>
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price.toFixed(2)}</p>
          <Link to={`/produits/${p.id}`}>View details</Link>
        </div>
      ))}
    </div>
  );
}

export default Product;