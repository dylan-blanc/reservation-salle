import { useAuth } from "../hooks/useAuth.js";
function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center  h-screen">
      <h1>Bienvenue {user?.firstname} !</h1>
      <p>Email : {user?.email}</p>
    </div>
  );
}

export default Dashboard;
