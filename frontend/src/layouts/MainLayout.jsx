// layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-primary relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>

      <Header />
      <main className="grow relative z-10 flex flex-col items-center justify-center">
        <Outlet /> {/* ← La page enfant s'affiche ici */}
      </main>
      <Footer />
    </div>
  );
}
export default MainLayout;
