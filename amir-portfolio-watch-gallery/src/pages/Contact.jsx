import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageCircle,
  Clock3,
  ArrowUpLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import GlassCard from "../components/common/GlassCard";
import SectionTitle from "../components/common/SectionTitle";

import { useSiteSettings } from "../context/useSiteSettings";

function Contact() {
  const { settings } = useSiteSettings();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("idle");

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const messages = JSON.parse(
        localStorage.getItem("am-messages") || "[]"
      );

      const newMessage = {
        id: Date.now(),

        name: form.name.trim(),

        email: form.email.trim(),

        subject: form.subject.trim(),

        message: form.message.trim(),

        date: new Date().toLocaleDateString("fa-IR"),

        time: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      localStorage.setItem(
        "am-messages",
        JSON.stringify([
          ...messages,
          newMessage,
        ])
      );

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setFormStatus("success");

      setTimeout(() => {
        setFormStatus("idle");
      }, 4000);
    } catch (error) {
      console.error(
        "خطا در ذخیره پیام:",
        error
      );

      setFormStatus("error");

      setTimeout(() => {
        setFormStatus("idle");
      }, 4000);
    }
  };

  return (
    <section className="contact-page">

      {/* Header */}

      <SectionTitle
        eyebrow="GET IN TOUCH"
        title={
          settings.contactTitle ||
          "بیایید چیزی متفاوت بسازیم."
        }
        description={
          settings.contactDescription ||
          "اگر ایده‌ای برای یک وب‌سایت مدرن، رابط کاربری خاص یا پروژه Front-End داری، می‌توانیم درباره آن صحبت کنیم و مسیر اجرای آن را با هم مشخص کنیم."
        }
        align="right"
      />


      {/* Availability */}

      <motion.div
        className="contact-availability"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
      >
        <span className="contact-availability-dot" />

        <span>
          آماده دریافت پروژه‌های جدید هستم
        </span>

        <span className="contact-availability-line" />

        <span className="contact-availability-time">
          پاسخ‌گویی در کوتاه‌ترین زمان
        </span>
      </motion.div>


      {/* Main Grid */}

      <div className="contact-grid">

        {/* Contact Information */}

        <motion.div
          className="contact-info"
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <GlassCard>

            <span className="contact-label">
              CONTACT DETAILS
            </span>

            <h2>
              یک ایده داری؟
              <span>
                بیایید اجرایش کنیم.
              </span>
            </h2>

            <p className="contact-description">
              برای همکاری، طراحی و توسعه پروژه‌های
              Front-End، ساخت رابط‌های کاربری اختصاصی
              یا صحبت درباره یک ایده جدید، می‌توانی
              از راه‌های ارتباطی زیر با من در تماس باشی.
            </p>


            {/* Contact Details */}

            <div className="contact-details">

              {/* Email */}

              <a
                href={`mailto:${settings.email || ""}`}
                className="contact-detail"
              >

                <div className="contact-detail-icon">
                  <Mail size={20} />
                </div>

                <div>
                  <span>
                    ایمیل
                  </span>

                  <strong>
                    {settings.email ||
                      "ایمیل ثبت نشده"}
                  </strong>
                </div>

                <ArrowUpLeft
                  className="contact-detail-arrow"
                  size={17}
                />

              </a>


              {/* Location */}

              <div className="contact-detail">

                <div className="contact-detail-icon">
                  <MapPin size={20} />
                </div>

                <div>
                  <span>
                    موقعیت
                  </span>

                  <strong>
                    {settings.location ||
                      "موقعیت ثبت نشده"}
                  </strong>
                </div>

              </div>


              {/* Phone */}

              <div className="contact-detail">

                <div className="contact-detail-icon">
                  <Phone size={20} />
                </div>

                <div>
                  <span>
                    شماره تماس
                  </span>

                  <a
                    href={`tel:${settings.phone || ""}`}
                    className="contact-phone-link"
                  >
                    {settings.phone ||
                      "شماره تماس ثبت نشده"}
                  </a>
                </div>

              </div>


              {/* Response Time */}

              <div className="contact-detail">

                <div className="contact-detail-icon">
                  <Clock3 size={20} />
                </div>

                <div>
                  <span>
                    زمان پاسخ‌گویی
                  </span>

                  <strong>
                    معمولاً کمتر از ۲۴ ساعت
                  </strong>
                </div>

              </div>

            </div>


            {/* Social */}

            <div className="contact-social-area">

              <span>
                SOCIAL & PORTFOLIO
              </span>

              <div className="contact-socials">

                <a
                  href={
                    settings.github ||
                    "https://github.com/"
                  }
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <span className="contact-github-icon">
                    GH
                  </span>
                </a>


                <a
                  href="#"
                  aria-label="Telegram"
                >
                  <MessageCircle size={19} />
                </a>

              </div>

            </div>

          </GlassCard>

        </motion.div>


        {/* Contact Form */}

        <motion.div
          className="contact-form-wrapper"
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <GlassCard>

            <div className="contact-form-header">

              <div>

                <span>
                  START A PROJECT
                </span>

                <h2>
                  درباره پروژه‌ات بگو
                </h2>

              </div>

              <div className="contact-form-sparkle">
                <Sparkles size={18} />
              </div>

            </div>


            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              {/* Name */}

              <div className="form-group">

                <label htmlFor="name">
                  نام و نام خانوادگی
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="نام شما"
                  value={form.name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      name: event.target.value,
                    })
                  }
                  required
                />

              </div>


              {/* Email */}

              <div className="form-group">

                <label htmlFor="email">
                  ایمیل
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      email: event.target.value,
                    })
                  }
                  required
                />

              </div>


              {/* Subject */}

              <div className="form-group">

                <label htmlFor="subject">
                  موضوع پروژه
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="مثلاً طراحی سایت فروشگاهی"
                  value={form.subject}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      subject: event.target.value,
                    })
                  }
                  required
                />

              </div>


              {/* Message */}

              <div className="form-group">

                <label htmlFor="message">
                  توضیحات پروژه
                </label>

                <textarea
                  id="message"
                  rows="6"
                  placeholder="پیام خود را بنویسید..."
                  value={form.message}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      message: event.target.value,
                    })
                  }
                  required
                />

              </div>


              {/* Submit */}

              <button
                type="submit"
                className="contact-submit"
                disabled={
                  formStatus === "success"
                }
              >

                {formStatus === "success" ? (
                  <>
                    <span>
                      پیام با موفقیت ثبت شد
                    </span>

                    <CheckCircle2 size={18} />
                  </>
                ) : (
                  <>
                    <span>
                      ارسال درخواست
                    </span>

                    <Send size={18} />
                  </>
                )}

              </button>


              {/* Success */}

              {formStatus === "success" && (
                <motion.div
                  className="contact-success-message"
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  پیام شما با موفقیت ثبت شد و
                  ادمین‌ها به زودی به آن رسیدگی می‌کنند.
                </motion.div>
              )}


              {/* Error */}

              {formStatus === "error" && (
                <motion.div
                  className="contact-success-message"
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  ذخیره پیام با خطا مواجه شد.
                  دوباره تلاش کنید.
                </motion.div>
              )}

            </form>

          </GlassCard>

        </motion.div>

      </div>


      {/* Services */}

      <motion.section
        className="contact-services"
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.7,
        }}
      >

        <div className="contact-services-heading">

          <span>
            WHAT I CAN DO
          </span>

          <h2>
            برای چه پروژه‌هایی؟
          </h2>

        </div>


        <div className="contact-services-grid">

          <div className="contact-service-card">

            <span>
              01
            </span>

            <h3>
              Front-End
            </h3>

            <p>
              توسعه رابط‌های کاربری مدرن،
              سریع و واکنش‌گرا با React.
            </p>

          </div>


          <div className="contact-service-card">

            <span>
              02
            </span>

            <h3>
              UI / UX
            </h3>

            <p>
              تبدیل ایده و طرح اولیه به
              تجربه کاربری تمیز و حرفه‌ای.
            </p>

          </div>


          <div className="contact-service-card">

            <span>
              03
            </span>

            <h3>
              Web Design
            </h3>

            <p>
              طراحی سایت‌های اختصاصی،
              فروشگاهی و پورتفولیو.
            </p>

          </div>

        </div>

      </motion.section>

    </section>
  );
}

export default Contact;