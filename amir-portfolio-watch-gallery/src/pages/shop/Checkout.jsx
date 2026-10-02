import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CreditCard,
  MapPin,
  UserRound,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";

import GlassCard from "../../components/common/GlassCard";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import IranCityPicker from "../../components/common/IranCityPicker";
function Checkout() {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
  } = useAuth();
const [selectedCity, setSelectedCity] = useState("");
  const {
    cart,
    cartCount,
    cartTotal,
    clearCart,
  } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    postalCode: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/shop/auth", {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        city: user.city || "",
        address: user.address || "",
        postalCode: user.postalCode || "",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newOrder = {
      id: `AM-${Date.now()
        .toString()
        .slice(-6)}`,

      date: new Date().toLocaleDateString(
        "fa-IR"
      ),

      status: "در حال پردازش",

      statusType: "pending",

      total: cartTotal,

      itemsCount: cartCount,

      items: cart,

      customer: {
        name: form.name,
        phone: form.phone,
        email: form.email,
        city: form.city,
        address: form.address,
        postalCode: form.postalCode,
      },

      payment: "پرداخت نمایشی",
    };

    const savedOrders = JSON.parse(
      localStorage.getItem("am-orders") || "[]"
    );

    localStorage.setItem(
      "am-orders",
      JSON.stringify([
        newOrder,
        ...savedOrders,
      ])
    );

    clearCart();

    navigate("/shop/order-success");
  };

  if (cart.length === 0) {
    return (
      <section className="checkout-empty">
        <ShoppingBag size={45} />

        <h1>
          سبد خرید خالی است
        </h1>

        <p>
          برای ثبت سفارش ابتدا یک محصول به سبد خرید
          اضافه کنید.
        </p>

        <Link to="/shop/products">
          مشاهده محصولات
          <ArrowRight size={17} />
        </Link>
      </section>
    );
  }

  return (
    <section className="checkout-page">

      <div className="checkout-header">

        <span>
          CHECKOUT
        </span>

        <h1>
          ثبت سفارش
        </h1>

        <p>
          اطلاعات خود را بررسی کنید و سفارش خود را ثبت کنید.
        </p>

      </div>

      <form
        className="checkout-layout"
        onSubmit={handleSubmit}
      >

        <GlassCard className="checkout-form-card">

          {/* Personal Information */}

          <div className="checkout-section-title">

            <UserRound size={19} />

            <div>
              <span>
                PERSONAL INFORMATION
              </span>

              <h2>
                اطلاعات شخصی
              </h2>
            </div>

          </div>

          <div className="checkout-fields">

            <label>
              نام و نام خانوادگی

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="مثلاً امیر احمدی"
                required
              />
            </label>

            <label>
              شماره موبایل

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="09xxxxxxxxx"
                required
              />
            </label>

            <label>
              ایمیل

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                dir="ltr"
                required
              />
            </label>

          </div>

          {/* Shipping Address */}

          <div className="checkout-section-title">

            <MapPin size={19} />

            <div>
              <span>
                SHIPPING ADDRESS
              </span>

              <h2>
                آدرس ارسال
              </h2>
            </div>

          </div>

          <div className="checkout-fields">

            <label>
  شهر

  <IranCityPicker
    value={selectedCity}
    onChange={setSelectedCity}
  />

  <input
    type="hidden"
    name="city"
    value={selectedCity}
    required
  />
</label>

            <label className="checkout-full">
              آدرس کامل

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="5"
                placeholder="آدرس کامل خود را وارد کنید..."
                required
              />
            </label>

            <label>
              کد پستی

              <input
                type="text"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="کد پستی"
                dir="ltr"
                required
              />
            </label>

          </div>

          {/* Payment */}

          <div className="checkout-section-title">

            <CreditCard size={19} />

            <div>
              <span>
                PAYMENT
              </span>

              <h2>
                روش پرداخت
              </h2>
            </div>

          </div>

          <label className="payment-option">

            <input
              type="radio"
              name="payment"
              value="پرداخت نمایشی"
              defaultChecked
            />

            <div>

              <strong>
                پرداخت نمایشی
              </strong>

              <span>
                در نسخه فعلی، پرداخت واقعی فعال نیست.
              </span>

            </div>

          </label>

          <button
            type="submit"
            className="checkout-submit"
          >
            ثبت سفارش

            <ArrowRight size={18} />
          </button>

        </GlassCard>

        {/* Order Summary */}

        <GlassCard className="checkout-summary">

          <span>
            ORDER SUMMARY
          </span>

          <h2>
            خلاصه سفارش
          </h2>

          <div className="checkout-products">

            {cart.map((item) => (
              <div
                key={item.id}
                className="checkout-product"
              >

                <div className="checkout-product-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                </div>

                <div>

                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    {item.quantity.toLocaleString(
                      "fa-IR"
                    )}

                    {" × "}

                    {item.price.toLocaleString(
                      "fa-IR"
                    )}
                  </span>

                </div>

              </div>
            ))}

          </div>

          <div className="checkout-summary-row">

            <span>
              تعداد
            </span>

            <strong>
              {cartCount.toLocaleString(
                "fa-IR"
              )}
            </strong>

          </div>

          <div className="checkout-summary-row">

            <span>
              ارسال
            </span>

            <strong>
              رایگان
            </strong>

          </div>

          <div className="checkout-total">

            <span>
              مبلغ نهایی
            </span>

            <strong>
              {cartTotal.toLocaleString(
                "fa-IR"
              )}

              <small>
                {" "}تومان
              </small>
            </strong>

          </div>

        </GlassCard>

      </form>

    </section>
  );
}

export default Checkout;