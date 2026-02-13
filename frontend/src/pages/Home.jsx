import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Planning from "../components/Planning.jsx";
import logo from "../assets/Logo.png";

function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div
      className={`w-full ${isAuthenticated ? "max-w-4xl" : "max-w-md"} px-4 transition-all duration-500`}
    >
      <div className="glass-card w-full transition-all duration-500 hover:border-white/30 text-center">
        <div className="flex flex-col gap-4">
          {isAuthenticated ? (
            <div className="w-full">
              <Planning />
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn-premium bg-white/5 border border-white/10 hover:bg-white/10 text-white w-full uppercase text-xs tracking-widest py-3"
              >
                Se connecter
              </Link>
              <div className="flex items-center gap-3 my-2">
                <div className="h-px bg-white/10 flex-1"></div>
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  Nouveau ?
                </span>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>
              <Link
                to="/register"
                className="btn-premium bg-white/5 border border-white/10 hover:bg-white/10 text-white w-full uppercase text-xs tracking-widest py-3"
              >
                Créer un compte
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
