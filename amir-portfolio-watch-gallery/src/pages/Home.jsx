import { motion } from "framer-motion";

import Button from "../components/common/Button";
import GlassCard from "../components/common/GlassCard";
import SectionTitle from "../components/common/SectionTitle";
import SkillsSection from "../components/portfolio/SkillsSection";
import ProjectsSection from "../components/portfolio/ProjectsSection";
import ThreeScene from "../components/three/ThreeScene";
import AboutSection from "../components/portfolio/AboutSection";
import WatchGalleryIntro from "../components/portfolio/WatchGalleryIntro";
import ExplodedWatchSection from "../components/portfolio/ExplodedWatchSection";
import { Link } from "react-router-dom";

import { useSiteSettings } from "../context/useSiteSettings";

function Home() {
  const { settings } = useSiteSettings();

  return (
    <div className="home-page">

      {/* Hero */}
      <section className="hero">

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <motion.span
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
          >
            PORTFOLIO / WATCH GALLERY
          </motion.span>


          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {settings.homeTitle || "طراحی در بُعد جدید"}
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.5,
            }}
          >
            {settings.homeSubtitle ||
              "یک تجربه دیجیتال سه‌بعدی، مدرن و تعاملی با تمرکز بر طراحی رابط کاربری و توسعه Front-End."}
          </motion.p>


          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.7,
            }}
          >

            <Link to="/portfolio">
              <Button variant="primary">
                مشاهده Portfolio
              </Button>
            </Link>

            <Link to="/shop">
              <Button variant="secondary">
                ورود به Watch Gallery
              </Button>
            </Link>

          </motion.div>

        </motion.div>


        {/* 3D Hero */}

        <motion.div
          initial={{
            opacity: 0,
            y: 80,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.2,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <GlassCard className="hero-object">
            <ThreeScene />
          </GlassCard>

        </motion.div>

      </section>


      {/* About */}

      <AboutSection />


      {/* Skills */}

      <SkillsSection />


      {/* Projects */}

      <ProjectsSection />


      {/* Exploded 3D watch */}

      <ExplodedWatchSection />


      {/* Watch Gallery */}

      <WatchGalleryIntro />


      {/* Design System */}

      <motion.section
        className="demo-section"
        initial={{
          opacity: 0,
          y: 60,
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
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >

        <SectionTitle
          eyebrow="DESIGN SYSTEM"
          title="سیستم طراحی"
          description="تمام بخش‌های سایت بر اساس یک سیستم طراحی مشترک ساخته خواهند شد."
          align="right"
        />


        <GlassCard className="demo-card">

          <h3>
            کامپوننت‌های قابل استفاده مجدد
          </h3>

          <p>
            Button، GlassCard و SectionTitle پایه‌ی رابط کاربری پروژه هستند.
          </p>

        </GlassCard>

      </motion.section>

    </div>
  );
}

export default Home;