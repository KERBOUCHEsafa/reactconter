import express from 'express';
import Produit from '../models/produits.js';
import { protect, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Seuls ces champs peuvent être envoyés par le formulaire admin (rien d'autre).
const CHAMPS = ['name', 'title', 'description', 'category', 'price', 'image', 'stock'];

function garderChamps(body) {
  const donnees = {};
  for (const champ of CHAMPS) {
    if (body[champ] !== undefined) donnees[champ] = body[champ];
  }
  return donnees;
}

function erreurProduit(err, res) {
  if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
  if (err.name === 'CastError') return res.status(400).json({ message: 'Identifiant de produit invalide' });
  res.status(500).json({ message: err.message });
}

// Lire le catalogue : ouvert à tous
router.get('/', async function (req, res) {
  try {
    const produits = await Produit.find().sort({ createdAt: -1 });
    res.json(produits);
  } catch (err) {
    erreurProduit(err, res);
  }
});

router.get('/:id', async function (req, res) {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(produit);
  } catch (err) {
    erreurProduit(err, res);
  }
});

// Ajouter / modifier / supprimer : réservé à l'admin (protect PUIS isAdmin)
router.post('/', protect, isAdmin, async function (req, res) {
  try {
    const produit = await Produit.create(garderChamps(req.body));
    res.status(201).json(produit);
  } catch (err) {
    erreurProduit(err, res);
  }
});

router.put('/:id', protect, isAdmin, async function (req, res) {
  try {
    const produit = await Produit.findByIdAndUpdate(
      req.params.id,
      garderChamps(req.body),
      { new: true, runValidators: true }
    );
    if (!produit) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(produit);
  } catch (err) {
    erreurProduit(err, res);
  }
});

router.delete('/:id', protect, isAdmin, async function (req, res) {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json({ message: 'Produit supprimé', produit });
  } catch (err) {
    erreurProduit(err, res);
  }
});

export default router;