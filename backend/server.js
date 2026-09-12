import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import produitRoutes from './routes/produits.js';

mongoose.connect(process.env.MONGO_URI)
  .then(function () { console.log('MongoDB connecté'); })
  .catch(function (err) { console.log('Erreur MongoDB :', err.message); });

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', produitRoutes);

app.listen(5000, function () {
  console.log('Serveur sur http://localhost:5000');
});