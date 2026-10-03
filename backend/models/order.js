import mongoose from 'mongoose';

// Une ligne de commande garde une COPIE du nom et du prix au moment de l'achat :
// si l'admin change le prix plus tard, les anciennes commandes ne bougent pas.
const ligneSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
  name: { type: String, required: true },
  image: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [ligneSchema], required: true },
  sousTotal: { type: Number, required: true, min: 0 },
  livraison: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true, min: 0 },
  nom: { type: String, required: true, trim: true },
  prenom: { type: String, required: true, trim: true },
  email: { type: String, default: '' },
  telephone: { type: String, default: '' },
  wilaya: { type: String, default: '' },
  adresse: { type: String, default: '' },
  statut: { type: String, enum: ['En attente', 'Expédiée', 'Livrée', 'Annulée'], default: 'En attente' }
}, {
  timestamps: true
});

export default mongoose.model('Order', schema);