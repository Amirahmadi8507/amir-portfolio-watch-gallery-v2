import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Gem,
} from "lucide-react";

function AboutShop() {
  return (
    <section className="about-shop-page">

      <motion.div
        className="about-shop-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span>
          ABOUT AM WATCH GALLERY
        </span>

        <h1>
          زمان،
          <strong> با یک نگاه متفاوت.</strong>
        </h1>

        <p>
          AM Watch Gallery یک تجربه مفهومی برای نمایش
          ساعت‌های خاص، طراحی لوکس و رابط کاربری مدرن است.
          هدف ما ترکیب زیبایی‌شناسی، تکنولوژی و تجربه‌ای
          متفاوت از خرید آنلاین است.
        </p>
      </motion.div>

      <div className="about-shop-values">

        <div>
          <Sparkles size={25} />

          <h3>
            طراحی متفاوت
          </h3>

          <p>
            هر بخش با تمرکز روی جزئیات و تجربه کاربری طراحی شده است.
          </p>
        </div>

        <div>
          <ShieldCheck size={25} />

          <h3>
            کیفیت و اصالت
          </h3>

          <p>
            تمرکز روی محصولاتی با ظاهر حرفه‌ای و کیفیت بالا.
          </p>
        </div>

        <div>
          <Gem size={25} />

          <h3>
            تجربه لوکس
          </h3>

          <p>
            ترکیب فضای تاریک، شیشه‌ای و جزئیات طلایی برای تجربه‌ای خاص.
          </p>
        </div>

      </div>

    </section>
  );
}

export default AboutShop;