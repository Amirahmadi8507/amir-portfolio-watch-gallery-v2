import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingBag,
  Users,
  MessageSquare,
  Home,
  BriefcaseBusiness,
  Phone,
  Settings,
  Store,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function AdminSidebar() {

  const menuGroups = [
    {
      title: "اصلی",
      items: [
        {
          title: "داشبورد",
          path: "/admin",
          icon: LayoutDashboard,
        },
      ],
    },

    {
      title: "فروشگاه",
      items: [
        {
          title: "محصولات",
          path: "/admin/products",
          icon: Package,
        },
        {
          title: "دسته‌بندی‌ها",
          path: "/admin/categories",
          icon: Tags,
        },
        {
          title: "سفارش‌ها",
          path: "/admin/orders",
          icon: ShoppingBag,
        },
        {
          title: "کاربران",
          path: "/admin/users",
          icon: Users,
        },
      ],
    },

    {
      title: "محتوا",
      items: [
        {
          title: "صفحه اصلی",
          path: "/admin/home",
          icon: Home,
        },
        {
          title: "Portfolio",
          path: "/admin/portfolio",
          icon: BriefcaseBusiness,
        },
        {
          title: "ارتباط با من",
          path: "/admin/contact",
          icon: Phone,
        },
        {
          title: "پیام‌ها",
          path: "/admin/messages",
          icon: MessageSquare,
        },
      ],
    },

    {
      title: "سیستم",
      items: [
        {
          title: "تنظیمات",
          path: "/admin/settings",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <aside className="admin-sidebar">

      <div className="admin-brand">

        <div className="admin-brand-mark">
          AM
        </div>

        <div>
          <strong>AM ADMIN</strong>
          <span>CONTROL PANEL</span>
        </div>

      </div>


      <nav className="admin-navigation">

        {menuGroups.map((group) => (

          <div
            className="admin-menu-group"
            key={group.title}
          >

            <span className="admin-menu-title">
              {group.title}
            </span>

            {group.items.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) =>
                    `admin-nav-link ${
                      isActive ? "active" : ""
                    }`
                  }
                >
                  <Icon size={18} />

                  <span>
                    {item.title}
                  </span>
                </NavLink>
              );
            })}

          </div>

        ))}

      </nav>


      <div className="admin-sidebar-footer">

        <NavLink
          to="/shop"
          className="admin-store-link"
        >
          <Store size={18} />

          <span>
            مشاهده فروشگاه
          </span>
        </NavLink>

      </div>

    </aside>
  );
}

export default AdminSidebar;