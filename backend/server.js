// IMPORTANT : "dotenv/config" doit être le TOUT PREMIER import.
// En JavaScript moderne (ESM), chaque import est entièrement exécuté avant
// de passer au suivant. Si on importait d'abord les routes puis qu'on
// appelait dotenv.config() après, les routes auraient déjà lu process.env
// (vide) avant que le fichier .env soit chargé — ça casserait le JWT_SECRET.
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import produitRoutes from './routes/produits.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js';

mongoose.connect(process.env.MONGO_URI)
  .then(function () { console.log('MongoDB connecté'); })
  .catch(function (err) { console.log('Erreur MongoDB :', err.message); });

const app = express();

// Qui a le droit d'appeler ce serveur depuis un navigateur ?
// En local : Vite (port 5173 / 5174). En ligne : l'adresse de ton site (FRONTEND_URL).
const origines = ['http://localhost:5173', 'http://localhost:5174', process.env.FRONTEND_URL].filter(Boolean);
app.use(cors({ origin: origines }));
app.use(express.json());

app.use('/api/products', produitRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log('Serveur sur http://localhost:' + PORT);
});