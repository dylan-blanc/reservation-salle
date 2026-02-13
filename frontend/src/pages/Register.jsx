// pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import logo from "../assets/Logo.png";

function Register() {
  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Vérifications
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    setLoading(true);
    try {
      await register({
        surname: formData.surname,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card w-full max-w-md transition-all duration-500 hover:border-white/30">
      <div className="flex flex-col items-center mb-6">
        <Link
          to="/"
          className="mb-2 transition-transform hover:scale-105 active:scale-95"
        >
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>
        <p className="text-gray-400 text-xs text-center">
          Créez votre compte en quelques instants
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-[11px] text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Prénom
            </label>
            <input
              type="text"
              name="surname"
              className="input-premium"
              placeholder="Votre Prenom"
              value={formData.surname}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Nom
            </label>
            <input
              type="text"
              name="name"
              className="input-premium"
              placeholder="Votre Nom"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="input-premium"
            placeholder="Email@exemple.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              className="input-premium"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Confirmation
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="input-premium"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-premium bg-accent hover:bg-blue-500 text-white mt-2 w-full text-sm py-2.5"
        >
          {loading ? "Création..." : "S'inscrire"}
        </button>
      </form>

      <p className="text-center mt-6 text-gray-400 text-xs">
        Déjà un compte ?{" "}
        <Link
          to="/login"
          className="text-white font-bold hover:text-accent transition-colors underline underline-offset-4 pl-1"
        >
          Se connecter
        </Link>
      </p>
    </div>
  );
}

export default Register;
