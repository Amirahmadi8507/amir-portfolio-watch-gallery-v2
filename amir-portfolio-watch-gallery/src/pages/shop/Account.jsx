import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  LockKeyhole,
  LogOut,
  Mail,
  Package,
  Save,
  ShoppingBag,
  User,
} from "lucide-react";
import { useState } from "react";

import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import IranCityPicker from "../../components/common/IranCityPicker";
function Account() {
const {
  user,
  logout,
  updateProfile,
  updatePassword,
} = useAuth();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  const [name, setName] = useState(user?.name || "");
const [email, setEmail] = useState(user?.email || "");

const [phone, setPhone] = useState(
  user?.phone || ""
);

const [city, setCity] = useState(
  user?.city || ""
);

const [address, setAddress] = useState(
  user?.address || ""
);

const [postalCode, setPostalCode] = useState(
  user?.postalCode || ""
);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
    const [currentPassword, setCurrentPassword] =
  useState("");

const [newPassword, setNewPassword] =
  useState("");

const [confirmPassword, setConfirmPassword] =
  useState("");

const [passwordMessage, setPasswordMessage] =
  useState("");

const [passwordError, setPasswordError] =
  useState("");
  const savedOrders = JSON.parse(
    localStorage.getItem("am-orders") || "[]"
  );

  const orderCount = savedOrders.length;
  const recentOrders = savedOrders.slice(0, 3);
  const handleLogout = () => {
    logout();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("لطفاً نام خود را وارد کنید.");
      return;
    }

    if (!trimmedEmail) {
      setError("لطفاً ایمیل خود را وارد کنید.");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setError("لطفاً یک ایمیل معتبر وارد کنید.");
      return;
    }

    const result = updateProfile(
  trimmedName,
  trimmedEmail,
  phone.trim(),
  city.trim(),
  address.trim(),
  postalCode.trim()
);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setMessage(result.message);
  };
const handlePasswordSubmit = (event) => {
  event.preventDefault();

  setPasswordMessage("");
  setPasswordError("");

  if (!currentPassword) {
    setPasswordError(
      "لطفاً رمز عبور فعلی را وارد کنید."
    );
    return;
  }

  if (!newPassword) {
    setPasswordError(
      "لطفاً رمز عبور جدید را وارد کنید."
    );
    return;
  }

  if (newPassword.length < 6) {
    setPasswordError(
      "رمز عبور جدید باید حداقل ۶ کاراکتر باشد."
    );
    return;
  }

  if (newPassword !== confirmPassword) {
    setPasswordError(
      "تکرار رمز عبور با رمز جدید یکسان نیست."
    );
    return;
  }

  const result = updatePassword(
    currentPassword,
    newPassword
  );

  if (!result.success) {
    setPasswordError(result.message);
    return;
  }

  setCurrentPassword("");
  setNewPassword("");
  setConfirmPassword("");

  setPasswordMessage(result.message);
};
  if (!user) {
    return (
      <main className="account-page">
        <div className="account-empty">
          <div className="account-empty-icon">
            <User size={30} />
          </div>

          <h1>هنوز وارد حساب نشده‌ای</h1>

          <p>
            برای مشاهده حساب کاربری ابتدا وارد حساب خودت شو.
          </p>

          <Link
            to="/shop/auth"
            className="account-primary-button"
          >
            ورود به حساب
          </Link>
        </div>
      </main>
    );
  }

  const userName = user.name || "کاربر AM";

  const firstLetter = userName
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <main className="account-page">
      <div className="account-shell">

        {/* Top Bar */}

        <div className="account-topbar">
          <Link
            to="/shop"
            className="account-back"
          >
            <ArrowRight size={18} />
            بازگشت به فروشگاه
          </Link>

          <span className="account-label">
            حساب کاربری
          </span>
        </div>

        {/* Profile Header */}

        <section className="account-profile">
          <div className="account-avatar">
            {firstLetter}
          </div>

          <div className="account-profile-info">
            <span>خوش اومدی 👋</span>

            <h1>{userName}</h1>

            <p>
              <Mail size={16} />
              {user.email}
            </p>
          </div>

          <button
            type="button"
            className="account-logout"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            خروج از حساب
          </button>
        </section>

        {/* Account Stats */}

        <section className="account-stats">

          <div className="account-stat">
            <div className="account-stat-icon">
              <Package size={21} />
            </div>

            <div>
              <strong>
                {orderCount.toLocaleString("fa-IR")}
              </strong>

              <span>
                سفارش‌ها
              </span>
            </div>
          </div>

          <div className="account-stat">
            <div className="account-stat-icon">
              <Heart size={21} />
            </div>

            <div>
              <strong>
                {wishlist.length.toLocaleString("fa-IR")}
              </strong>

              <span>
                علاقه‌مندی‌ها
              </span>
            </div>
          </div>

          <div className="account-stat">
            <div className="account-stat-icon">
              <ShoppingBag size={21} />
            </div>

            <div>
              <strong>
                {cartCount.toLocaleString("fa-IR")}
              </strong>

              <span>
                محصول در سبد
              </span>
            </div>
          </div>

        </section>

        {/* Edit Profile */}

        <section className="account-edit-section">

          <div className="account-section-heading">
            <span>
              PROFILE SETTINGS
            </span>

            <h2>
              ویرایش پروفایل
            </h2>

            <p>
              اطلاعات حساب کاربری خودت را مدیریت کن.
            </p>
          </div>

          <form
            className="account-edit-card"
            onSubmit={handleSubmit}
          >

            <div className="account-edit-fields">

              <label>
                <span>
                  نام و نام خانوادگی
                </span>

                <div className="account-input-wrapper">
                  <User size={18} />

                  <input
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="نام خود را وارد کنید"
                  />
                </div>
              </label>

              <label>
                <span>
                  ایمیل
                </span>

                <div className="account-input-wrapper">
                  <Mail size={18} />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="example@email.com"
                  />
                </div>
              </label>

            </div>
<label>
  <span>
    شماره موبایل
  </span>

  <div className="account-input-wrapper">
    <input
      type="tel"
      value={phone}
      onChange={(event) =>
        setPhone(event.target.value)
      }
      placeholder="09123456789"
      dir="ltr"
    />
  </div>
</label>

<label>
  <span>
    شهر
  </span>

  <IranCityPicker
    value={city}
    onChange={setCity}
  />
</label>

<label className="account-address-field">
  <span>
    آدرس کامل
  </span>

  <div className="account-input-wrapper">
    <textarea
      value={address}
      onChange={(event) =>
        setAddress(event.target.value)
      }
      placeholder="آدرس کامل خود را وارد کنید..."
      rows="4"
    />
  </div>
</label>

<label>
  <span>
    کد پستی
  </span>

  <div className="account-input-wrapper">
    <input
      type="text"
      value={postalCode}
      onChange={(event) =>
        setPostalCode(event.target.value)
      }
      placeholder="کد پستی"
      dir="ltr"
    />
  </div>
</label>
            {/* Error */}

            {error && (
              <div className="account-form-message error">
                {error}
              </div>
            )}

            {/* Success */}

            {message && (
              <div className="account-form-message success">
                <CheckCircle2 size={17} />

                {message}
              </div>
            )}

            {/* Save */}

            <button
              type="submit"
              className="account-save-button"
            >
              <Save size={18} />

              ذخیره تغییرات
            </button>

          </form>

        </section>
<section className="account-password-section">

  <div className="account-section-heading">
    <span>
      SECURITY SETTINGS
    </span>

    <h2>
      تغییر رمز عبور
    </h2>

    <p>
      برای امنیت بیشتر حساب، رمز عبور خود را مدیریت کن.
    </p>
  </div>

  <form
    className="account-password-card"
    onSubmit={handlePasswordSubmit}
  >

    <div className="account-password-fields">

      <label>
        <span>
          رمز عبور فعلی
        </span>

        <div className="account-input-wrapper">
          <LockKeyhole size={18} />

          <input
            type="password"
            value={currentPassword}
            onChange={(event) =>
              setCurrentPassword(
                event.target.value
              )
            }
            placeholder="رمز عبور فعلی"
          />
        </div>
      </label>

      <label>
        <span>
          رمز عبور جدید
        </span>

        <div className="account-input-wrapper">
          <LockKeyhole size={18} />

          <input
            type="password"
            value={newPassword}
            onChange={(event) =>
              setNewPassword(
                event.target.value
              )
            }
            placeholder="حداقل ۶ کاراکتر"
          />
        </div>
      </label>

      <label>
        <span>
          تکرار رمز عبور جدید
        </span>

        <div className="account-input-wrapper">
          <LockKeyhole size={18} />

          <input
            type="password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(
                event.target.value
              )
            }
            placeholder="رمز عبور جدید را دوباره وارد کنید"
          />
        </div>
      </label>

    </div>

    {passwordError && (
      <div className="account-form-message error">
        {passwordError}
      </div>
    )}

    {passwordMessage && (
      <div className="account-form-message success">
        <CheckCircle2 size={17} />

        {passwordMessage}
      </div>
    )}

    <button
      type="submit"
      className="account-save-button"
    >
      <Save size={18} />

      تغییر رمز عبور
    </button>

  </form>
    <section className="account-recent-orders">

  <div className="account-section-heading">
    <span>
      RECENT ORDERS
    </span>

    <h2>
      آخرین سفارش‌ها
    </h2>

    <p>
      آخرین سفارش‌های ثبت‌شده خودت را مشاهده کن.
    </p>
  </div>

  {recentOrders.length === 0 ? (
    <div className="account-no-orders">
      <Package size={30} />

      <h3>
        هنوز سفارشی ثبت نکرده‌ای
      </h3>

      <p>
        بعد از ثبت اولین سفارش، اطلاعات آن اینجا نمایش داده می‌شود.
      </p>

      <Link
        to="/shop/products"
        className="account-primary-button"
      >
        مشاهده محصولات
      </Link>
    </div>
  ) : (
    <div className="account-orders-list">

      {recentOrders.map((order) => (
        <div
          key={order.id}
          className="account-order-card"
        >

          <div className="account-order-icon">
            <Package size={21} />
          </div>

          <div className="account-order-main">

            <strong>
              {order.id}
            </strong>

            <span>
              {order.date}
            </span>

          </div>

          <div className="account-order-details">

            <span>
              {order.itemsCount.toLocaleString("fa-IR")}
              {" محصول"}
            </span>

            <strong>
              {order.total.toLocaleString("fa-IR")}
              {" تومان"}
            </strong>

          </div>

          <div className="account-order-status">
            {order.status}
          </div>

        </div>
      ))}

    </div>
  )}

</section>
</section>
        {/* Quick Actions */}

        <section className="account-content">

          <div className="account-section-heading">
            <span>
              مدیریت حساب
            </span>

            <h2>
              دسترسی سریع
            </h2>
          </div>

          <div className="account-actions">

            {/* Orders */}

            <Link
              to="/shop/orders"
              className="account-action-card"
            >
              <div className="account-action-icon">
                <Package size={22} />
              </div>

              <div>
                <strong>
                  سفارش‌های من
                </strong>

                <span>
                  مشاهده سفارش‌ها و وضعیت آن‌ها
                </span>
              </div>

              <ArrowRight size={18} />
            </Link>

            {/* Wishlist */}

            <Link
              to="/shop/wishlist"
              className="account-action-card"
            >
              <div className="account-action-icon">
                <Heart size={22} />
              </div>

              <div>
                <strong>
                  علاقه‌مندی‌ها
                </strong>

                <span>
                  محصولاتی که ذخیره کرده‌ای
                </span>
              </div>

              <ArrowRight size={18} />
            </Link>

            {/* Cart */}

            <Link
              to="/shop/cart"
              className="account-action-card"
            >
              <div className="account-action-icon">
                <ShoppingBag size={22} />
              </div>

              <div>
                <strong>
                  سبد خرید
                </strong>

                <span>
                  مشاهده محصولات انتخاب‌شده
                </span>
              </div>

              <ArrowRight size={18} />
            </Link>

          </div>

        </section>

      </div>
    </main>
  );
}

export default Account;