import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Sparkles,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

function Auth() {
  const navigate = useNavigate();
 const { login, register, isAuthenticated } = useAuth();

useEffect(() => {
  if (isAuthenticated) {
    navigate("/shop/checkout", { replace: true });
  }
}, [isAuthenticated, navigate]);

  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  
const [watchTheme, setWatchTheme] = useState("purple");
const [watchTilt, setWatchTilt] = useState({
  x: 0,
  y: 0,
});
const [particles] = useState(() =>
  Array.from({ length: 22 }, (_, index) => ({
    id: index,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
  }))
);
const themeMessages = {
  purple: "استایل مرموز و خاص ✨",
  blue: "آرام، مدرن و دقیق 🌊",
  green: "متفاوت و پرانرژی 🌿",
  orange: "جسور و گرم 🔥",
};
const handlePlaygroundMouseMove = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const rotateY = ((x / rect.width) - 0.5) * 18;
  const rotateX = ((y / rect.height) - 0.5) * -18;

  setWatchTilt({
    x: rotateX,
    y: rotateY,
  });
};

const handlePlaygroundMouseLeave = () => {
  setWatchTilt({
    x: 0,
    y: 0,
  });
};
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mode === "login") {
      const result = login(
        form.email,
        form.password
      );

      if (!result.success) {
        setMessage(result.message);
        return;
      }

      navigate("/shop/checkout");
      return;
    }

    if (!form.name.trim()) {
      setMessage("لطفاً نام خود را وارد کنید.");
      return;
    }

    const result = register(
      form.name,
      form.email,
      form.password
    );

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    navigate("/shop/checkout");
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setMessage("");

    setForm({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <main className="auth-page">
      <div className="auth-shell">

        {/* Interactive Side */}
<section
  className={`auth-playground theme-${watchTheme}`}
  onMouseMove={handlePlaygroundMouseMove}
  onMouseLeave={handlePlaygroundMouseLeave}
>
    <div
  className="auth-mouse-light"
  style={{
    transform: `translate(
      ${watchTilt.y * 7}px,
      ${watchTilt.x * -7}px
    )`,
  }}
></div>
  <div className="auth-particles">
    {particles.map((particle) => (
      <span
        key={particle.id}
        className="auth-particle"
        style={{
          left: `${particle.left}%`,
          top: `${particle.top}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          animationDuration: `${particle.duration}s`,
          animationDelay: `${particle.delay}s`,
        }}
      />
    ))}
  </div>

  <div className="auth-playground-glow"></div>

          <div className="auth-playground-content">
            <span className="auth-mini-label">
              <Sparkles size={15} />
              AM EXPERIENCE
            </span>

            <h1>
              دنیای خودت را
              <br />
              <span>انتخاب کن.</span>
            </h1>

            <p>
              قبل از ورود، استایل مورد علاقه‌ات را
              انتخاب کن و وارد دنیای AM Watch Gallery شو.
            </p>

            <div
  className="auth-watch"
  style={{
    transform: `
      perspective(900px)
      rotateX(${watchTilt.x}deg)
      rotateY(${watchTilt.y}deg)
    `,
  }}
>
              <div className="auth-watch-ring">
                <div className="auth-watch-face">
                  <span>AM</span>

                  <div className="auth-watch-hand hand-hour"></div>
                  <div className="auth-watch-hand hand-minute"></div>

                  <div className="auth-watch-center"></div>
                </div>
              </div>
            </div>

            <div className="auth-color-options">
  <button
    type="button"
    className="color-purple"
    aria-label="بنفش"
    onClick={() => setWatchTheme("purple")}
  />

  <button
    type="button"
    className="color-blue"
    aria-label="آبی"
    onClick={() => setWatchTheme("blue")}
  />

  <button
    type="button"
    className="color-green"
    aria-label="سبز"
    onClick={() => setWatchTheme("green")}
  />

  <button
    type="button"
    className="color-orange"
    aria-label="نارنجی"
    onClick={() => setWatchTheme("orange")}
  />
</div>

            <div className="auth-score">
  <span>✦</span>

  <div>
    <strong>
      {themeMessages[watchTheme]}
    </strong>

    <small>
      یک تجربه متفاوت منتظرته
    </small>
  </div>
</div>
          </div>
        </section>

        {/* Auth Form */}
        <section className="auth-card">
          <Link to="/shop" className="auth-back">
            <ArrowLeft size={17} />
            بازگشت به فروشگاه
          </Link>

          <div className="auth-heading">
            <span className="auth-icon">
              <Lock size={19} />
            </span>

            <span className="auth-label">
              حساب کاربری
            </span>

            <h2>
              {mode === "login"
                ? "خوش برگشتی"
                : "حساب خودت را بساز"}
            </h2>

            <p>
              {mode === "login"
                ? "برای ادامه خرید وارد حساب خود شو."
                : "ثبت‌نام کن و تجربه خریدت را شروع کن."}
            </p>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => changeMode("login")}
            >
              ورود
            </button>

            <button
              type="button"
              className={mode === "register" ? "active" : ""}
              onClick={() => changeMode("register")}
            >
              ثبت‌نام
            </button>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            {mode === "register" && (
              <label className="auth-field">
                <span>نام و نام خانوادگی</span>

                <div>
                  <User size={18} />

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="مثلاً امیر احمدی"
                  />
                </div>
              </label>
            )}

            <label className="auth-field">
              <span>ایمیل</span>

              <div>
                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>
            </label>

            <label className="auth-field">
              <span>رمز عبور</span>

              <div>
                <Lock size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="رمز عبور"
                  dir="ltr"
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  aria-label="نمایش رمز عبور"
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </label>

            {message && (
              <div className="auth-message">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
            >
              {mode === "login"
                ? "ورود به حساب"
                : "ساخت حساب کاربری"}

              <ArrowLeft size={18} />
            </button>
          </form>

          <div className="auth-footer">
            <span>
              {mode === "login"
                ? "حساب کاربری نداری؟"
                : "قبلاً حساب ساختی؟"}
            </span>

            <button
              type="button"
              onClick={() =>
                changeMode(
                  mode === "login"
                    ? "register"
                    : "login"
                )
              }
            >
              {mode === "login"
                ? "ثبت‌نام کن"
                : "وارد شو"}
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}

export default Auth;