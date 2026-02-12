// layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">
        <Outlet /> {/* ← La page enfant s'affiche ici */}
      </main>
      <Footer />
    </div>
  );
}
export default MainLayout;
