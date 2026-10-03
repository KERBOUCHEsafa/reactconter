import express from 'express';
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../model/user.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || '');

function creerToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

router.post('/register', async function (req, res) {
  try {
    const payload = {
      nom: req.body.nom || `${req.body.name || ''} ${req.body.surname || ''}`.trim(),
      email: req.body.email,
      password: req.body.password
    };

    if (!payload.nom || !payload.email || !payload.password) {
      return res.status(400).json({ message: 'Nom, email et mot de passe requis' });
    }

    const user = await User.create(payload);
    res.status(201).json({ nom: user.nom, email: user.email, role: user.role, token: creerToken(user) });
  } catch (err) {
    res.status(400).json({ message: 'Email déjà utilisé' });
  }
});

router.post('/login', async function (req, res) {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ message: 'Identifiants incorrects' });
  }

  res.json({ nom: user.nom, email: user.email, role: user.role, token: creerToken(user) });
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
    if (!payload || !payload.email) {
      return res.status(401).json({ message: 'Google token invalide' });
    }

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        nom: payload.name || payload.given_name || 'Google user',
        email: payload.email,
        password: crypto.randomBytes(24).toString('hex'),
        role: 'client'
      });
    }

    res.json({ nom: user.nom, email: user.email, role: user.role, token: creerToken(user) });
  } catch (err) {
    res.status(401).json({ message: 'Google authentication failed' });
  }
});

export default router;