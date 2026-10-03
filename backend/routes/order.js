import express from 'express';
import mongoose from 'mongoose';
import Order from '../models/order.js';
import Produit from '../models/produits.js';
import { protect, isAdmin } from '../middleware/auth.js';

const router = express.Router();
const LIVRAISON_GRATUITE_DES = 10000;
const FRAIS_LIVRAISON = 500;
const STATUTS = ['En attente', 'Expédiée', 'Livrée', 'Annulée'];

// PASSER UNE COMMANDE  →  POST /api/orders   (il faut être connecté)
router.post('/', protect, async function (req, res) {
  try {
    const { items, nom, prenom, email, wilaya, telephone, adresse } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Le panier est vide' });
    }

    const ids = items.map(function (item) { return String(item.id); });

    if (!ids.every(function (id) { return mongoose.isValidObjectId(id); })) {
      return res.status(400).json({ message: 'Produit invalide' });
    }

    const produitsEnBase = await Produit.find({ _id: { $in: ids } });
    let sousTotal = 0;
    const lignes = [];

    for (const item of items) {
      const produit = produitsEnBase.find(function (p) {
        return String(p._id) === String(item.id);
      });
      const quantity = Number(item.quantity);

      if (!produit) {
        return res.status(400).json({ message: 'Produit introuvable' });
      }
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        return res.status(400).json({ message: 'Quantité invalide pour ' + produit.name });
      }
      if (quantity > produit.stock) {
        return res.status(400).json({ message: 'Stock insuffisant pour ' + produit.name });
      }

      sousTotal += produit.price * quantity;
      lignes.push({
        product: produit._id,
        name: produit.name,
        image: produit.image,
        price: produit.price,
        quantity: quantity
      });
    }

    const livraison = sousTotal >= LIVRAISON_GRATUITE_DES ? 0 : FRAIS_LIVRAISON;
    const order = await Order.create({
      user: req.user._id,
      items: lignes,
      sousTotal: sousTotal,
      livraison: livraison,
      total: sousTotal + livraison,
      nom: nom || '',
      prenom: prenom || '',
      email: email || '',
      telephone: telephone || '',
      wilaya: wilaya || '',
      adresse: adresse || '',
      statut: 'En attente'
    });

    for (const ligne of lignes) {
      await Produit.updateOne({ _id: ligne.product }, { $inc: { stock: -ligne.quantity } });
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// MES COMMANDES  →  GET /api/orders/mine   (il faut être connecté)
router.get('/mine', protect, async function (req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// TOUTES LES COMMANDES (admin) → GET /api/orders
router.get('/', protect, isAdmin, async function (req, res) {
  try {
    const orders = await Order.find().populate('user', 'nom email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CHANGER LE STATUT (admin) → PATCH /api/orders/:id/statut
router.patch('/:id/statut', protect, isAdmin, async function (req, res) {
  try {
    const { statut } = req.body;
    if (!STATUTS.includes(statut)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Commande introuvable' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Commande introuvable' });
    }

    if (order.statut === 'Annulée') {
      return res.status(400).json({ message: 'Cette commande est annulée, elle ne peut plus changer' });
    }

    if (statut === 'Annulée') {
      for (const ligne of order.items) {
        await Produit.updateOne({ _id: ligne.product }, { $inc: { stock: ligne.quantity } });
      }
    }

    order.statut = statut;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;