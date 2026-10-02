import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Package,
  ShoppingBag,
} from "lucide-react";

function Orders() {
  const savedOrders = JSON.parse(
    localStorage.getItem("am-orders") || "[]"
  );

  const orders = savedOrders;

  return (
    <main className="orders-page">
      <div className="orders-shell">

        {/* Header */}
        <div className="orders-topbar">
          <Link to="/shop/account" className="orders-back">
            <ArrowRight size={18} />
            بازگشت به حساب کاربری
          </Link>

          <span className="orders-label">
            MY ORDERS
          </span>
        </div>

        {/* Heading */}
        <section className="orders-heading">
          <div className="orders-heading-icon">
            <Package size={24} />
          </div>

          <div>
            <span>تاریخچه خرید</span>

            <h1>سفارش‌های من</h1>

            <p>
              سفارش‌های قبلی و وضعیت آن‌ها را اینجا مشاهده کن.
            </p>
          </div>
        </section>

        {/* Orders */}
        {orders.length > 0 ? (
          <section className="orders-list">
            {orders.map((order) => (
              <article
                className="order-card"
                key={order.id}
              >
                <div className="order-card-top">

                  <div className="order-number">
                    <span>شماره سفارش</span>

                    <strong>
                      {order.id}
                    </strong>
                  </div>

                  <div
                    className={`order-status ${
                      order.statusType
                    }`}
                  >
                    {order.statusType === "success" ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Clock3 size={16} />
                    )}

                    {order.status}
                  </div>

                </div>

                <div className="order-card-divider"></div>

                <div className="order-card-bottom">

                  <div className="order-info">
                    <span>تاریخ</span>

                    <strong>
                      {order.date}
                    </strong>
                  </div>

                  <div className="order-info">
                    <span>محصولات</span>

                    <strong>
                      {order.itemsCount} محصول
                    </strong>
                  </div>

                  <div className="order-info">
                    <span>مبلغ</span>

                    <strong>
                      {order.total.toLocaleString("fa-IR")} تومان
                    </strong>
                  </div>

                  <Link
  to={`/shop/orders/${order.id}`}
  className="order-view-button"
>
  مشاهده جزئیات
</Link>

                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="orders-empty">

            <div className="orders-empty-icon">
              <ShoppingBag size={30} />
            </div>

            <h2>
              هنوز سفارشی نداری
            </h2>

            <p>
              وقتی اولین خریدت رو انجام بدی،
              سفارش اینجا نمایش داده میشه.
            </p>

            <Link
              to="/shop/products"
              className="orders-shop-button"
            >
              مشاهده محصولات
            </Link>

          </section>
        )}

      </div>
    </main>
  );
}

export default Orders;