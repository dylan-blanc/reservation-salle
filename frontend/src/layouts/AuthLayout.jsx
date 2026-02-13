// layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements centralized here */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/15 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[100px]"></div>

      <div className="w-full flex flex-col items-center justify-center relative z-10">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
