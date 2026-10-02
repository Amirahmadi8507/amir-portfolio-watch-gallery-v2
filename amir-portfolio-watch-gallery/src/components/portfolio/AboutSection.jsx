import { motion } from "framer-motion";
import GlassCard from "../common/GlassCard";
import SectionTitle from "../common/SectionTitle";

function AboutSection() {
  return (
    <section className="about-section">

      <SectionTitle
        eyebrow="ABOUT ME"
        title="درباره من"
        description="توسعه‌دهنده Front-End با تمرکز روی ساخت تجربه‌های دیجیتال مدرن، تعاملی و متفاوت."
        align="right"
      />

      <div className="about-grid">

        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <GlassCard>

            <span className="about-label">
             AMIR AHMADI FRONT-END DEVELOPER
            </span>

            <h3>
              ساخت تجربه‌هایی که
              <span> فقط یک سایت نیستند.</span>
            </h3>

            <p>
              من به طراحی رابط کاربری، توسعه Front-End و
              ساخت تجربه‌های دیجیتال مدرن علاقه‌مندم.
              هدفم ترکیب طراحی خلاقانه با کدنویسی تمیز
              و تعاملات جذاب است.
            </p>

            <p>
              در این Portfolio تلاش کرده‌ام بخشی از
              مهارت‌ها، پروژه‌ها و نگاه خودم به طراحی
              وب را در قالب یک تجربه سه‌بعدی نمایش دهم.
            </p>

          </GlassCard>
        </motion.div>


        <div className="about-stats">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard>
              <span className="about-stat-number">
                01
              </span>

              <span className="about-stat-title">
                طراحی اختصاصی
              </span>

              <p>
                بدون استفاده از قالب‌های آماده
              </p>
            </GlassCard>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard>
              <span className="about-stat-number">
                02
              </span>

              <span className="about-stat-title">
                تجربه سه‌بعدی
              </span>

              <p>
                WebGL و Three.js در قلب تجربه
              </p>
            </GlassCard>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GlassCard>
              <span className="about-stat-number">
                03
              </span>

              <span className="about-stat-title">
                طراحی Responsive
              </span>

              <p>
                تجربه مناسب برای موبایل و دسکتاپ
              </p>
            </GlassCard>
          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default AboutSection;