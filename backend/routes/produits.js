import express from 'express';
import Produit from '../models/produits.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async function (req, res) {
  try {
    const produits = await Produit.find();
    res.json(produits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async function (req, res) {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      res.status(404).json({ message: 'Produit non trouvé' });
      return;
    }
    res.json(produit);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).json({ message: 'Identifiant de produit invalide' });
      return;
    }
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, async function (req, res) {
  try {
    const produit = await Produit.create(req.body);
    res.status(201).json(produit);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', protect, async function (req, res) {
  try {
    const produit = await Produit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!produit) {
      res.status(404).json({ message: 'Produit non trouvé' });
      return;
    }

    res.json(produit);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message });
      return;
    }
    if (err.name === 'CastError') {
      res.status(400).json({ message: 'Identifiant de produit invalide' });
      return;
    }
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', protect, async function (req, res) {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) {
      res.status(404).json({ message: 'Produit non trouvé' });
      return;
    }
    res.json({ message: 'Produit supprimé', produit });
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).json({ message: 'Identifiant de produit invalide' });
      return;
    }
    res.status(500).json({ message: err.message });
  }
});

export default router;