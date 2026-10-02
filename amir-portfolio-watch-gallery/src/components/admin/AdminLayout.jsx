import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout() {
  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        <AdminHeader />

        <div className="admin-page-content">
          <Outlet />
        </div>

      </main>

    </div>
  );
}

export default AdminLayout;