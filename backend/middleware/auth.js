import jwt from 'jsonwebtoken'
import User from '../model/user.js'

// protect = "es-tu connectée ?"  (401 si non)
// On relit le compte dans la base à chaque fois : si l'admin change ton rôle,
// ou si le compte est supprimé, c'est pris en compte tout de suite.
export async function protect(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Connecte-toi d\'abord' })

  try {
    const contenu = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(contenu.id).select('-password')
    if (!user) return res.status(401).json({ message: 'Compte introuvable' })
    req.user = user
    next()
  } catch (err) {
    res.status(401).json({ message: 'Session expirée, reconnecte-toi' })
  }
}

// isAdmin = "as-tu le droit ?"  (403 si non). Toujours APRÈS protect.
export function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Réservé à l\'administrateur' })
  }
  next()
}