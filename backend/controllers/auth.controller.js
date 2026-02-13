// controllers/auth.controller.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { OAuth2Client } from "google-auth-library";

// Génère un token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { email, password, surname, name } = req.body;

    if (!email || !password || !surname || !name) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Email déjà utilisé" });
    }

    const user = await User.create({ email, password, surname, name });
    const token = generateToken(user);

    res.status(201).json({ message: "Inscription réussie", user, token });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user || !(await User.verifyPassword(password, user.password))) {
      return res.status(401).json({ error: "Identifiants incorrects" });
    }

    const token = generateToken(user);
    res.json({
      user: {
        id: user.id,
        email: user.email,
        surname: user.surname,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// POST /api/auth/google
const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    // Vérification du token Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.VITE_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name, sub: googleId } = payload;

    // Chercher l'utilisateur par email
    let user = await User.findByEmail(email);

    if (!user) {
      // Créer l'utilisateur s'il n'existe pas
      // On met un mot de passe aléatoire car il ne sera pas utilisé
      const randomPassword = Math.random().toString(36).slice(-10);
      user = await User.create({
        email,
        password: randomPassword,
        surname: given_name || "Utilisateur",
        name: family_name || "Google",
      });
    }

    const token = generateToken(user);
    res.json({
      user: {
        id: user.id,
        email: user.email,
        surname: user.surname,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(401).json({ error: "Authentification Google échouée" });
  }
};

// GET /api/auth/me
export const getProfile = async (req, res) => {
  console.log(req.user);
  res.json({ user: req.user });
};
