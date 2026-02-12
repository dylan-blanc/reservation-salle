// layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";
function AuthLayout() {
  return (
    <>
      <div className="main">
        <Outlet />
      </div>
    </>
  );
}
export default AuthLayout;
