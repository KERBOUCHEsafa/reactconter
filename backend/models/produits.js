import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name:        { type: String, required: true },
 
  title:       String,
  price:       { type: Number, required: true, min: 0 },
  image:       String,
  rating:      Number,
  reviews:     Number,
  stock:       { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model('Produit', schema);