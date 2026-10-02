import { Navigate, Outlet, useLocation } from "react-router-dom";

function AdminRoute() {
  const location = useLocation();

  const isAdminAuthenticated =
    localStorage.getItem("am-admin-auth") === "true";

  if (!isAdminAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}

export default AdminRoute;