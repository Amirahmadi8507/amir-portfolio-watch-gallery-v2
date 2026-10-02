import {
  Bell,
  ExternalLink,
  User,
} from "lucide-react";

import { Link } from "react-router-dom";

function AdminHeader() {
  return (
    <header className="admin-header">

      <div className="admin-header-title">

        <span>
          مدیریت سایت
        </span>

        <strong>
          AM Atelier
        </strong>

      </div>


      <div className="admin-header-actions">

        <Link
          to="/shop"
          className="admin-header-store"
          title="مشاهده فروشگاه"
        >
          <ExternalLink size={17} />
        </Link>

        <button
          type="button"
          className="admin-notification"
          aria-label="اعلان‌ها"
        >
          <Bell size={18} />
          <span />
        </button>

        <div className="admin-user">

          <div className="admin-user-avatar">
            <User size={17} />
          </div>

          <div>
            <strong>
              مدیر سایت
            </strong>

            <span>
              Administrator
            </span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default AdminHeader;