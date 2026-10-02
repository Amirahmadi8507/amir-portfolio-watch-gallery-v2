import { useState } from "react";
import { LockKeyhole, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    // اطلاعات ورود پنل ادمین
    const ADMIN_EMAIL = "amiradmin@gmail.com";
    const ADMIN_PASSWORD = "Amir@2026";

    if (email.trim() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError("ایمیل یا رمز عبور ادمین اشتباه است.");
      return;
    }

    // ذخیره وضعیت ورود ادمین
    localStorage.setItem("am-admin-auth", "true");

    // صفحه‌ای که کاربر قبل از ورود قصد ورود به آن را داشت
    const from = location.state?.from?.pathname || "/admin";

    navigate(from, { replace: true });
  };

  return (
    <div className="admin-login-page">
      <motion.div
        className="admin-login-card"
        initial={{ opacity: 0, y: 35, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="admin-login-header">
          <div className="admin-login-logo">
            <span className="brand-dot"></span>
            <span>AM</span>
          </div>

          <span className="admin-eyebrow">AM ADMIN PANEL</span>

          <h1>
            ورود به <span>پنل مدیریت</span>
          </h1>

          <p>
            برای مدیریت فروشگاه و محتوای سایت وارد حساب مدیر شوید.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-login-field">
            <label htmlFor="admin-email">ایمیل مدیر</label>

            <div className="admin-login-input">
              <Mail size={18} />

              <input
                id="admin-email"
                type="email"
                placeholder="admin@amatelier.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="admin-login-field">
            <label htmlFor="admin-password">رمز عبور</label>

            <div className="admin-login-input">
              <LockKeyhole size={18} />

              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                placeholder="رمز عبور را وارد کنید"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={
                  showPassword
                    ? "مخفی کردن رمز عبور"
                    : "نمایش رمز عبور"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              className="admin-login-error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <button type="submit" className="admin-login-submit">
            ورود به پنل
            <ArrowLeft size={18} />
          </button>
        </form>

        <div className="admin-login-footer">
          <Link to="/">
            بازگشت به سایت اصلی
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLogin;