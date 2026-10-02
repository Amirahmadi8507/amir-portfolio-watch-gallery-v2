import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  MessageSquare,
  Settings,
  ArrowLeft,
  TrendingUp,
   LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import GlassCard from "../../components/common/GlassCard";
import { useProducts } from "../../context/useProducts";

function AdminDashboard() {
  const { products } = useProducts();

const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("am-admin-auth");
  navigate("/admin/login", { replace: true });
};

  // -----------------------------
  // Orders
  // -----------------------------

  const savedOrders = JSON.parse(
    localStorage.getItem("am-orders") || "[]"
  );

  const orders = Array.isArray(savedOrders)
    ? savedOrders
    : [];

  // -----------------------------
  // Account
  // -----------------------------

  const savedAccount =
    localStorage.getItem("am-account");

  const account = savedAccount
    ? JSON.parse(savedAccount)
    : null;

  // -----------------------------
  // Statistics
  // -----------------------------

  const totalProducts = products.length;

  const totalOrders = orders.length;

  const totalUsers = account ? 1 : 0;

  const totalSales = orders.reduce(
    (total, order) => {
      return total + (Number(order.total) || 0);
    },
    0
  );

  // -----------------------------
  // Recent Orders
  // -----------------------------

  const recentOrders = [...orders]
    .reverse()
    .slice(0, 5);

  // -----------------------------
  // Stats
  // -----------------------------

  const stats = [
    {
      title: "محصولات",
      value: totalProducts.toLocaleString("fa-IR"),
      icon: Package,
    },
    {
      title: "سفارش‌ها",
      value: totalOrders.toLocaleString("fa-IR"),
      icon: ShoppingBag,
    },
    {
      title: "کاربران",
      value: totalUsers.toLocaleString("fa-IR"),
      icon: Users,
    },
    {
      title: "فروش",
      value:
        totalSales > 0
          ? `${totalSales.toLocaleString("fa-IR")} تومان`
          : "۰ تومان",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="admin-dashboard">

      {/* =========================
          Header
      ========================== */}

      <div className="admin-dashboard-header">

        <div>
          <span className="admin-eyebrow">
            AM ADMIN PANEL
          </span>

          <h1>
            داشبورد
            <span> مدیریت</span>
          </h1>

          <p>
            از اینجا می‌توانی تمام محتوای فروشگاه و
            سایت خودت را مدیریت کنی.
          </p>
        </div>

        <Link
          to="/shop"
          className="admin-back-link"
        >
          بازگشت به فروشگاه
          <ArrowLeft size={17} />
        </Link>


<button
    type="button"
    className="admin-logout-btn"
    onClick={handleLogout}
  >
    خروج از پنل
    <LogOut size={17} />
  </button>


      </div>


      {/* =========================
          Statistics
      ========================== */}

      <div className="admin-stats-grid">

        {stats.map((stat, index) => {

          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
            >

              <GlassCard className="admin-stat-card">

                <div className="admin-stat-icon">
                  <Icon size={21} />
                </div>

                <div>
                  <span>
                    {stat.title}
                  </span>

                  <strong>
                    {stat.value}
                  </strong>
                </div>

              </GlassCard>

            </motion.div>
          );
        })}

      </div>


      {/* =========================
          Dashboard Content
      ========================== */}

      <div className="admin-content-grid">


        {/* =====================
            Management
        ====================== */}

        <GlassCard className="admin-menu-card">

          <div className="admin-card-heading">

            <div>
              <span>
                MANAGEMENT
              </span>

              <h2>
                مدیریت محتوا
              </h2>
            </div>

            <LayoutDashboard size={22} />

          </div>


          <div className="admin-management-grid">

            <Link to="/admin/products">
              <Package size={20} />
              <span>
                مدیریت محصولات
              </span>
            </Link>


            <Link to="/admin/orders">
              <ShoppingBag size={20} />
              <span>
                مدیریت سفارش‌ها
              </span>
            </Link>


            <Link to="/admin/users">
              <Users size={20} />
              <span>
                مدیریت کاربران
              </span>
            </Link>


            <Link to="/admin/messages">
              <MessageSquare size={20} />
              <span>
                پیام‌های دریافتی
              </span>
            </Link>


            <Link to="/admin/settings">
              <Settings size={20} />
              <span>
                تنظیمات سایت
              </span>
            </Link>

          </div>

        </GlassCard>


        {/* =====================
            Welcome
        ====================== */}

        <GlassCard className="admin-welcome-card">

          <span>
            AM ATELIER
          </span>

          <h2>
            کنترل کامل
            <br />
            <strong>
              فروشگاه تو.
            </strong>
          </h2>

          <p>
            در مراحل بعدی، تمام بخش‌های فروشگاه را
            به این پنل متصل می‌کنیم تا بتوانی بدون
            تغییر مستقیم کد، محتوای سایت را مدیریت کنی.
          </p>

        </GlassCard>

      </div>


      {/* =========================
          Recent Orders
      ========================== */}

      <GlassCard className="admin-recent-orders">

        <div className="admin-card-heading">

          <div>
            <span>
              RECENT ACTIVITY
            </span>

            <h2>
              آخرین سفارش‌ها
            </h2>
          </div>

          <ShoppingBag size={22} />

        </div>


        {recentOrders.length > 0 ? (

          <div className="admin-orders-list">

            {recentOrders.map((order) => (

              <div
                className="admin-order-row"
                key={order.id}
              >

                <div className="admin-order-main">

                  <strong>
                    {order.id}
                  </strong>

                  <span>
                    {order.date}
                  </span>

                </div>


                <div className="admin-order-items">

                  <span>
                    محصولات
                  </span>

                  <strong>
                    {Number(
                      order.itemsCount || 0
                    ).toLocaleString("fa-IR")}
                  </strong>

                </div>


                <div className="admin-order-price">

                  <span>
                    مبلغ
                  </span>

                  <strong>
                    {Number(
                      order.total || 0
                    ).toLocaleString("fa-IR")}
                    {" "}
                    تومان
                  </strong>

                </div>


                <div
                  className={`admin-order-status ${
                    order.statusType || ""
                  }`}
                >
                  {order.status || "در حال پردازش"}
                </div>


                <Link
                  to={`/shop/orders/${order.id}`}
                  className="admin-order-view"
                >
                  مشاهده
                </Link>

              </div>

            ))}

          </div>

        ) : (

          <div className="admin-orders-empty">

            <ShoppingBag size={30} />

            <h3>
              هنوز سفارشی ثبت نشده
            </h3>

            <p>
              وقتی اولین سفارش ثبت شود،
              اطلاعات آن اینجا نمایش داده می‌شود.
            </p>

          </div>

        )}

      </GlassCard>


      {/* =========================
          Quick Actions
      ========================== */}

      <GlassCard className="admin-quick-actions">

        <div className="admin-card-heading">

          <div>
            <span>
              QUICK ACTIONS
            </span>

            <h2>
              دسترسی سریع
            </h2>
          </div>

          <TrendingUp size={22} />

        </div>


        <div className="admin-quick-grid">

          <Link to="/admin/products/new">

            <Package size={20} />

            <div>
              <strong>
                افزودن محصول
              </strong>

              <span>
                محصول جدید به فروشگاه اضافه کن
              </span>
            </div>

          </Link>


          <Link to="/admin/products">

            <Package size={20} />

            <div>
              <strong>
                مدیریت محصولات
              </strong>

              <span>
                محصولات موجود را مدیریت کن
              </span>
            </div>

          </Link>


          <Link to="/shop/products">

            <ShoppingBag size={20} />

            <div>
              <strong>
                مشاهده فروشگاه
              </strong>

              <span>
                فروشگاه را به‌عنوان کاربر ببین
              </span>
            </div>

          </Link>

        </div>

      </GlassCard>

    </section>
  );
}

export default AdminDashboard;