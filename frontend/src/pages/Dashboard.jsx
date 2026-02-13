import { useAuth } from "../hooks/useAuth.js";
function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-white">Bienvenue {user?.surname} !</h1>
      <p className="text-gray-400">Email : {user?.email}</p>
      <p className="text-gray-400">Prenom : {user?.surname}</p>
      <p className="text-gray-400">Nom : {user?.name}</p>
    </div>
  );
}

export default Dashboard;
