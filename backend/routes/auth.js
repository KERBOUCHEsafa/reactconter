import express from 'express';
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../model/user.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const googleClient = new OAuth2Client();

// Le "bracelet de connexion" (JWT) : il contient l'identifiant du compte, signé
// avec JWT_SECRET. Plus de valeur de secours : sans JWT_SECRET, server.js refuse de démarrer.
function creerToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// Les comptes créés AVANT ce guide ont pu garder des majuscules dans l'email
// ("Lina@Gmail.com") : on cherche l'email tel quel ET en minuscules.
function chercherParEmail(emailSaisi) {
  const tel = (emailSaisi || '').trim();
  return User.findOne({ email: { $in: [tel, tel.toLowerCase()] } });
}

// Ce que le site reçoit après une connexion (jamais le mot de passe).
function reponseConnexion(user) {
  return { id: user._id, nom: user.nom, email: user.email, role: user.role, token: creerToken(user) };
}

router.post('/register', async function (req, res) {
  try {
    const nom = (req.body.nom || `${req.body.name || ''} ${req.body.surname || ''}`).trim();
    const email = (req.body.email || '').trim().toLowerCase();
    const password = req.body.password || '';

    if (!nom || !email || !password) {
      return res.status(400).json({ message: 'Nom, email et mot de passe requis' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit faire au moins 6 caractères' });
    }
    if (await chercherParEmail(req.body.email)) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // On ne lit JAMAIS le rôle envoyé par le navigateur : tout nouveau compte est "client".
    const user = await User.create({ nom, email, password, role: 'client' });
    res.status(201).json(reponseConnexion(user));
  } catch (err) {
    res.status(400).json({ message: 'Inscription impossible : ' + err.message });
  }
});

router.post('/login', async function (req, res) {
  const user = await chercherParEmail(req.body.email);

  if (!user || !(await bcrypt.compare(req.body.password || '', user.password))) {
    return res.status(401).json({ message: 'Identifiants incorrects' });
  }

  res.json(reponseConnexion(user));
});

router.post('/google', async function (req, res) {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: 'Google credential manquant' });
  }
  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.status(500).json({ message: 'Google client ID non configuré' });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.email_verified) {
      return res.status(401).json({ message: 'Google token invalide' });
    }

    const email = payload.email.toLowerCase();
    let user = await chercherParEmail(payload.email);

    if (!user) {
      user = await User.create({
        nom: payload.name || payload.given_name || 'Client Google',
        email,
        password: crypto.randomBytes(24).toString('hex'),
        role: 'client'
      });
    }

    res.json(reponseConnexion(user));
  } catch (err) {
    res.status(401).json({ message: 'Connexion Google refusée' });
  }
});

// "Qui suis-je ?" : le site s'en sert pour vérifier que la connexion est toujours valable.
router.get('/me', protect, function (req, res) {
  res.json({ id: req.user._id, nom: req.user.nom, email: req.user.email, role: req.user.role });
});

export default router;