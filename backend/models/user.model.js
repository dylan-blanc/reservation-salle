// models/user.model.js
import { query } from "../config/db.js";
import bcrypt from "bcrypt";
const User = {
  // Trouver par email
  async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const results = await query(sql, [email.toLowerCase()]);
    return results[0] || null;
  },
  // Trouver par ID (sans le password)
  async findById(id) {
    const sql =
      "SELECT id, email, surname, name FROM users WHERE id = ?";
    const results = await query(sql, [id]);
    return results[0] || null;
  },
  // Créer un utilisateur
  async create({ email, password, surname, name }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `
INSERT INTO users (email, password, surname, name, created_at, updated_at)
VALUES (?, ?, ?, ?, NOW(), NOW())
`;
    const result = await query(sql, [
      email.toLowerCase().trim(),
      hashedPassword,
      surname.trim(),
      name.trim(),
    ]);
    return { id: result.insertId, email, surname, name };
  },
  // Vérifier le mot de passe
  async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  },
};

export default User;
