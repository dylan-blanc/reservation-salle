// components/Header.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth.js";
import logo from "../assets/Logo.png";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold tracking-wide transition ${
      isActive ? "text-white" : "text-slate-200 hover:text-white"
    }`;
  return (
    <header className="bg-slate-950 text-white shadow-[0_12px_40px_rgba(2,6,23,0.35)]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center">
          <nav
            aria-label="Global"
            className="hidden flex-1 items-center gap-8 md:flex"
          ></nav>

          <div className="flex flex-1 justify-center">
            <Link
              to="/"
              alt="Accueil"
              className="flex items-center gap-2 text-white"
            >
              <img src={logo} alt="Accueil" className="h-10 w-auto" />
              <span className="hidden text-sm font-semibold tracking-[0.2em] text-slate-200 sm:inline">
                TechSpace Solutions
              </span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="me"
                  className="text-sm font-semibold text-slate-200 transition hover:text-white"
                >
                  Mon Profile
                </Link>
                <span className="hidden text-sm text-slate-300 sm:inline">
                  Bonjour {user?.surname}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-semibold text-slate-200 transition hover:text-white"
                >
                  Deconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-200 transition hover:text-white"
                >
                  Log in <span aria-hidden="true">→</span>
                </Link>
                <Link
                  to="/register"
                  className="rounded-full border border-slate-700 px-4 py-1.5 text-sm font-semibold text-white transition hover:border-indigo-400 hover:text-indigo-200"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
