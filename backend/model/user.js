import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const schema = new mongoose.Schema({
  nom:      { type: String, required: true },
  // L'email est mis en minuscules À L'INSCRIPTION (routes/auth.js).
  // Pas d'option "lowercase" ici : elle empêcherait de retrouver les anciens comptes
  // créés avec des majuscules (Mongoose l'appliquerait aussi aux recherches).
  email:    { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  // Seulement deux rôles possibles : n'importe quelle autre valeur est refusée.
  role:     { type: String, enum: ['client', 'admin'], default: 'client' }
}, {
  timestamps: true
})

// AVANT chaque sauvegarde : on brouille le mot de passe.
// Fonction async SANS "next" (Mongoose moderne, sinon "next is not a function").
schema.pre('save', async function() {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

export default mongoose.model('User', schema)