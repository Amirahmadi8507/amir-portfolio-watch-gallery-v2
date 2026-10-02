import { motion } from "framer-motion";
import {
  Code2,
  Layers3,
  Sparkles,
  ArrowUpLeft,
} from "lucide-react";

import GlassCard from "../components/common/GlassCard";

function Portfolio() {
  return (
    <section className="portfolio-page">

      <motion.div
        className="portfolio-page-hero"
        initial={{
          opacity: 0,
          y: 35,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <span>
          AM PORTFOLIO
        </span>

        <h1>
          طراحی،
          <strong> تجربه و کد.</strong>
        </h1>

        <p>
          مجموعه‌ای از پروژه‌ها، تجربه‌ها و مسیر من در
          دنیای طراحی رابط کاربری و توسعه Front-End.
        </p>
      </motion.div>

      <div className="portfolio-page-grid">

        <GlassCard>
          <Code2 size={25} />

          <span>
            FRONT-END
          </span>

          <h2>
            توسعه رابط کاربری
          </h2>

          <p>
            ساخت رابط‌های مدرن، واکنش‌گرا و تعاملی با React،
            JavaScript، HTML و CSS.
          </p>
        </GlassCard>

        <GlassCard>
          <Layers3 size={25} />

          <span>
            UI / UX
          </span>

          <h2>
            طراحی تجربه
          </h2>

          <p>
            تمرکز روی ساخت تجربه‌ای ساده، زیبا و متفاوت
            برای کاربران.
          </p>
        </GlassCard>

        <GlassCard>
          <Sparkles size={25} />

          <span>
            3D WEB
          </span>

          <h2>
            وب سه‌بعدی
          </h2>

          <p>
            استفاده از Three.js و React Three Fiber برای
            ساخت تجربه‌های تعاملی سه‌بعدی.
          </p>
        </GlassCard>

      </div>

      <div className="portfolio-page-projects">

        <div>
          <span>
            SELECTED WORK
          </span>

          <h2>
            پروژه‌های منتخب
          </h2>
        </div>

        <div className="portfolio-project-preview">

          <div>
            <span>
              01
            </span>

            <h3>
              AM Watch Gallery
            </h3>

            <p>
              فروشگاه مفهومی ساعت با طراحی لوکس،
              رابط کاربری RTL و تجربه سه‌بعدی.
            </p>
          </div>

          <ArrowUpLeft size={22} />

        </div>

      </div>

    </section>
  );
}

export default Portfolio;