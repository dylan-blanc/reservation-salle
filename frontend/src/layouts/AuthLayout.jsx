// layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
function AuthLayout() {
  return (
    <>
    <Header />
      <div className="main">
        <Outlet />
      </div>
    </>
  );
}
export default AuthLayout;
