// pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

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
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <h1 className="text-3xl font-bold">Connexion</h1>

        {error && (
          <p className="text-red-500 bg-red-100 p-2 rounded w-full max-w-xs text-center border border-red-200">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="flex items-center gap-4 w-full max-w-xs">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-500 text-sm">OU</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Erreur d'initialisation Google")}
          useOneTap
          theme="filled_blue"
          shape="pill"
        />

        <p className="text-gray-600">
          Pas de compte ?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </GoogleOAuthProvider>
  );
}
export default Login;
