import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Package,
  Truck,
  UserRound,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

function OrderDetails() {
  const { id } = useParams();

  const savedOrders = JSON.parse(
    localStorage.getItem("am-orders") || "[]"
  );

  const order = savedOrders.find(
    (item) => item.id === id
  );

  if (!order) {
    return (
      <main className="order-details-page">
        <div className="order-details-empty">
          <Package size={32} />

          <h1>سفارش پیدا نشد</h1>

          <p>
            این سفارش وجود ندارد یا ممکن است حذف شده باشد.
          </p>

          <Link to="/shop/orders">
            بازگشت به سفارش‌ها
          </Link>
        </div>
      </main>
    );
  }

  const customer = order.customer || {};

  return (
    <main className="order-details-page">
      <div className="order-details-shell">

        <div className="order-details-topbar">
          <Link
            to="/shop/orders"
            className="order-details-back"
          >
            <ArrowRight size={18} />
            بازگشت به سفارش‌ها
          </Link>

          <span>ORDER DETAILS</span>
        </div>

        <section className="order-details-header">
          <div>
            <span>سفارش</span>

            <h1>{order.id}</h1>

            <p>
              ثبت شده در {order.date}
            </p>
          </div>

          <div
            className={`order-details-status ${order.statusType}`}
          >
            {order.statusType === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <Clock3 size={18} />
            )}

            {order.status}
          </div>
        </section>

        {/* Timeline */}

        <section className="order-timeline-section">
          <div className="order-details-title">
            <Truck size={19} />
            <h2>مراحل سفارش</h2>
          </div>

          <div className="order-timeline">

            <div className="timeline-item completed">
              <div className="timeline-icon">
                <CheckCircle2 size={17} />
              </div>

              <div className="timeline-content">
                <strong>ثبت سفارش</strong>

                <span>
                  سفارش با موفقیت ثبت شد
                </span>
              </div>
            </div>

            <div className="timeline-line"></div>

            <div className="timeline-item active">
              <div className="timeline-icon">
                <Clock3 size={17} />
              </div>

              <div className="timeline-content">
                <strong>در حال پردازش</strong>

                <span>
                  سفارش در حال آماده‌سازی است
                </span>
              </div>
            </div>

            <div className="timeline-line"></div>

            <div className="timeline-item">
              <div className="timeline-icon">
                <Truck size={17} />
              </div>

              <div className="timeline-content">
                <strong>ارسال شده</strong>

                <span>
                  سفارش پس از آماده‌سازی ارسال می‌شود
                </span>
              </div>
            </div>

            <div className="timeline-line"></div>

            <div className="timeline-item">
              <div className="timeline-icon">
                <Package size={17} />
              </div>

              <div className="timeline-content">
                <strong>تحویل شده</strong>

                <span>
                  سفارش به دست شما می‌رسد
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* اطلاعات گیرنده */}

        <section className="order-customer-section">
          <div className="order-details-title">
            <UserRound size={19} />

            <div>
              <span>SHIPPING INFORMATION</span>
              <h2>اطلاعات گیرنده</h2>
            </div>
          </div>

          <div className="order-customer-grid">

            <div className="order-customer-item">
              <UserRound size={18} />

              <div>
                <span>نام و نام خانوادگی</span>
                <strong>
                  {customer.name || "ثبت نشده"}
                </strong>
              </div>
            </div>

            <div className="order-customer-item">
              <Phone size={18} />

              <div>
                <span>شماره موبایل</span>
                <strong>
                  {customer.phone || "ثبت نشده"}
                </strong>
              </div>
            </div>

            <div className="order-customer-item">
              <Mail size={18} />

              <div>
                <span>ایمیل</span>
                <strong>
                  {customer.email || "ثبت نشده"}
                </strong>
              </div>
            </div>

            <div className="order-customer-item">
              <MapPin size={18} />

              <div>
                <span>شهر</span>
                <strong>
                  {customer.city || "ثبت نشده"}
                </strong>
              </div>
            </div>

            <div className="order-customer-item order-customer-full">
              <MapPin size={18} />

              <div>
                <span>آدرس کامل</span>
                <strong>
                  {customer.address || "ثبت نشده"}
                </strong>
              </div>
            </div>

            <div className="order-customer-item">
              <Package size={18} />

              <div>
                <span>کد پستی</span>
                <strong>
                  {customer.postalCode || "ثبت نشده"}
                </strong>
              </div>
            </div>

          </div>
        </section>

        {/* محصولات */}

        <section className="order-details-section">
          <div className="order-details-title">
            <Package size={19} />

            <h2>محصولات سفارش</h2>
          </div>

          <div className="order-products">
            {order.items?.map((product) => (
              <div
                className="order-product"
                key={product.id}
              >
                <div className="order-product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="order-product-info">
                  <h3>{product.name}</h3>

                  <span>
                    تعداد: {product.quantity}
                  </span>
                </div>

                <strong>
                  {(
                    product.price *
                    product.quantity
                  ).toLocaleString("fa-IR")}{" "}
                  تومان
                </strong>
              </div>
            ))}
          </div>
        </section>

        {/* خلاصه سفارش */}

        <section className="order-summary">

          <div>
            <span>تعداد محصولات</span>

            <strong>
              {order.itemsCount} محصول
            </strong>
          </div>

          <div>
            <span>روش پرداخت</span>

            <strong>
              {order.payment || "پرداخت نمایشی"}
            </strong>
          </div>

          <div className="order-summary-total">
            <span>مبلغ نهایی</span>

            <strong>
              {order.total.toLocaleString("fa-IR")} تومان
            </strong>
          </div>

        </section>

      </div>
    </main>
  );
}

export default OrderDetails;