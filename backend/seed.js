import 'dotenv/config';
import mongoose from 'mongoose';
import Produit from './models/produits.js';

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI or MONGODB_URI must be configured');
}

const produits = [1, 2, 3, 4, 5, 6].map((id) => ({
  name: 'Rode',
  title: 'Rode microphone',
  price: 5000,
  image: `/assets/pic${id}.jpeg`,
  rating: 4.8,
  reviews: 128,
  stock: 15,
}));

try {
  await mongoose.connect(mongoUri);
  await Produit.deleteMany({});
  await Produit.insertMany(produits);
  console.log(`Seeded ${produits.length} products`);
} finally {
  await mongoose.disconnect();
}
