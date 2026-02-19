import { useAuth } from "../hooks/useAuth.js";
function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen w-full items-start justify-center px-4 pt-10">
      <div className="glass-card w-full max-w-md transition-all duration-500 hover:border-white/30">
        <div className="mb-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Espace personnel
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-white">
            Bienvenue {user?.surname}
          </h1>
        </div>

        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Email
            </span>
            <span className="font-medium text-white">{user?.email}</span>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Prenom
            </span>
            <span className="font-medium text-white">{user?.surname}</span>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Nom
            </span>
            <span className="font-medium text-white">{user?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
