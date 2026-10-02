import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

import GlassCard from "../common/GlassCard";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import WatchStage from "../three/WatchStage";
function WatchGalleryIntro() {
  return (
    <section className="watch-gallery-intro">

      <GlassCard className="watch-gallery-intro-card">

        <motion.div
          className="watch-gallery-intro-content"
          initial={{
            opacity: 0,
            x: 50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <span className="watch-gallery-intro-label">
            <Sparkles size={15} />
            WATCH GALLERY
          </span>

          <h2>
            زمان را
            <span> متفاوت ببین.</span>
          </h2>

          <p>
            یک تجربه متفاوت برای کشف ساعت‌های خاص،
            با طراحی لوکس، رابط کاربری مدرن و
            تجربه‌ای سه‌بعدی و تعاملی.
          </p>

          <Link to="/shop">
  <Button variant="primary">
    ورود به Watch Gallery
    <ArrowLeft size={17} />
  </Button>
</Link>

        </motion.div>

        <div className="watch-gallery-intro-3d">
          <WatchStage category="minimal" controls />
        </div>

      </GlassCard>

    </section>
  );
}

export default WatchGalleryIntro;