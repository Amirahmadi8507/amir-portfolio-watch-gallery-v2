import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Package,
  ShoppingBag,
} from "lucide-react";

function OrderSuccess() {
  const savedOrders = JSON.parse(
    localStorage.getItem("am-orders") || "[]"
  );

  const order = savedOrders[0];

  if (!order) {
    return (
      <main className="order-success-page">
        <div className="order-success-empty">
          <ShoppingBag size={38} />

          <h1>سفارشی پیدا نشد</h1>

          <p>
            هنوز سفارشی برای نمایش وجود ندارد.
          </p>

          <Link to="/shop/products">
            مشاهده محصولات
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="order-success-page">
      <div className="order-success-shell">

        <section className="order-success-card">

          <div className="order-success-icon">
            <CheckCircle2 size={48} />
          </div>

          <span className="order-success-label">
            ORDER CONFIRMED
          </span>

          <h1>
            سفارش شما با موفقیت ثبت شد
          </h1>

          <p>
            سفارش شما در سیستم ثبت شده و در حال پردازش است.
          </p>

          <div className="order-success-number">
            <span>شماره سفارش</span>

            <strong>
              {order.id}
            </strong>
          </div>

          <div className="order-success-info">

            <div>
              <Package size={19} />

              <span>تعداد محصولات</span>

              <strong>
                {order.itemsCount.toLocaleString("fa-IR")}
              </strong>
            </div>

            <div>
              <ShoppingBag size={19} />

              <span>وضعیت</span>

              <strong>
                {order.status}
              </strong>
            </div>

            <div>
              <CheckCircle2 size={19} />

              <span>مبلغ نهایی</span>

              <strong>
                {order.total.toLocaleString("fa-IR")}
                {" "}
                تومان
              </strong>
            </div>

          </div>

          <div className="order-success-actions">

            <Link
              to={`/shop/orders/${order.id}`}
              className="order-success-primary"
            >
              مشاهده جزئیات سفارش

              <ArrowLeft size={18} />
            </Link>

            <Link
              to="/shop/products"
              className="order-success-secondary"
            >
              ادامه خرید
            </Link>

          </div>

        </section>

      </div>
    </main>
  );
}

export default OrderSuccess;