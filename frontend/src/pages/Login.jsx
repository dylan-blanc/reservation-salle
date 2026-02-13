// pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import logo from "../assets/Logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle(credentialResponse.credential);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Erreur de connexion Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="glass-card w-full max-w-md transition-all duration-500 hover:border-white/30">
        <div className="flex flex-col items-center mb-6">
          <Link
            to="/"
            className="mb-2 transition-transform hover:scale-105 active:scale-95"
          >
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>
          <p className="text-gray-400 text-xs text-center">
            Connectez-vous à votre espace
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-[11px] text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Email
            </label>
            <input
              type="email"
              className="input-premium"
              placeholder="Email@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                Mot de passe
              </label>
            </div>
            <input
              type="password"
              className="input-premium"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-premium bg-accent hover:bg-blue-500 text-white mt-2 w-full text-sm py-2.5"
          >
            {loading ? "Chargement..." : "Se connecter"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-gray-500 text-[9px] font-bold uppercase tracking-[0.2em]">
            Ou
          </span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        <div className="flex justify-center transform transition-transform hover:scale-[1.02]">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Échec Google")}
            useOneTap
            theme="filled_blue"
            shape="circle"
            size="large"
            width="100%"
          />
        </div>

        <p className="text-center mt-6 text-gray-400 text-xs">
          Pas de compte ?{" "}
          <Link
            to="/register"
            className="text-white font-bold hover:text-accent transition-colors underline underline-offset-4 pl-1"
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
