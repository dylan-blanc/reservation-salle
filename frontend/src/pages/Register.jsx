// pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import logo from "../assets/Logo.png";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateSurname,
} from "../services/regex.js";

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

  const [errors, setErrors] = useState({});
  // Un objet pour stocker les erreurs par champ en temps réel

  // const handleChange = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "password" || name === "confirmPassword") {
      value = value.replace(/\s/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    // Effacer l'erreur du champ quand on modifie sa valeur
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMsg = "";

    // On ne valide que si le champ n'est pas vide pour éviter les erreurs trop tôt
    if (value.trim() === "") return;

    if (name === "surname") {
      if (!validateSurname(value)) {
        errorMsg = "Prénom invalide";
      }
    } else if (name === "name") {
      if (!validateName(value)) {
        errorMsg = "Nom invalide";
      }
    } else if (name === "email") {
      if (!validateEmail(value)) {
        errorMsg = "Email invalide";
      }
    } else if (name === "password") {
      if (!validatePassword(value)) {
        errorMsg = "Mot de passe trop simple";
      }
    } else if (name === "confirmPassword") {
      if (value !== formData.password) {
        errorMsg = "Les mots de passe ne correspondent pas";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Vérifications
    if (!validateSurname(formData.surname)) {
      setError(
        "Le prénom n'est pas valide (lettres, espaces, tirets et apostrophes uniquement)",
      );
      return;
    }
    if (!validateName(formData.name)) {
      setError("Le nom n'est pas valide");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("L'adresse email n'est pas valide");
      return;
    }
    if (!validatePassword(formData.password)) {
      setError(
        "Le mot de passe doit contenir 8 caractères, une majuscule, une minuscule et un caractère spécial",
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    setLoading(true);
    try {
      await register({
        surname: formData.surname.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
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
              className={`input-premium ${errors.surname ? "border-red-500" : ""}`}
              placeholder="Votre Prenom"
              value={formData.surname}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              disabled={loading}
            />
            {errors.surname && (
              <p className="text-[12px] text-red-500 mt-0.5 pl-1">
                {errors.surname}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Nom
            </label>
            <input
              type="text"
              name="name"
              className={`input-premium ${errors.name ? "border-red-500" : ""}`}
              placeholder="Votre Nom"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              disabled={loading}
            />
            {errors.name && (
              <p className="text-[12px] text-red-500 mt-0.5 pl-1">
                {errors.name}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            className={`input-premium ${errors.email ? "border-red-500" : ""}`}
            placeholder="Email@exemple.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            disabled={loading}
          />
          {errors.email && (
            <p className="text-[12px] text-red-500 mt-0.5 pl-1">
              {errors.email}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              className={`input-premium ${errors.password ? "border-red-500" : ""}`}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              disabled={loading}
            />
            {errors.password && (
              <p className="text-[12px] text-red-500 mt-0.5 pl-1">
                {errors.password}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Confirmation
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`input-premium ${errors.confirmPassword ? "border-red-500" : ""}`}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              disabled={loading}
            />
            {errors.confirmPassword && (
              <p className="text-[12px] text-red-500 mt-0.5 pl-1">
                {errors.confirmPassword}
              </p>
            )}
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
