import { motion } from "framer-motion";
import {
  Braces,
  Code2,
  GitBranch,
  Layers3,
  Palette,
  Box,
} from "lucide-react";

import GlassCard from "../common/GlassCard";
import SectionTitle from "../common/SectionTitle";

const skills = [
  {
    title: "HTML",
    description: "ساختاردهی استاندارد و معنایی صفحات وب",
    level: "Advanced",
    icon: Code2,
  },
  {
    title: "CSS",
    description: "طراحی رابط کاربری، Responsive و انیمیشن",
    level: "Advanced",
    icon: Palette,
  },
  {
    title: "JavaScript",
    description: "تعاملات، منطق رابط و کار با DOM",
    level: "Intermediate",
    icon: Braces,
  },
  {
    title: "React",
    description: "ساخت رابط‌های کامپوننت‌محور و مدرن",
    level: "Learning",
    icon: Layers3,
  },
  {
    title: "Three.js",
    description: "ساخت تجربه‌های سه‌بعدی و WebGL",
    level: "Learning",
    icon: Box,
  },
  {
    title: "Git",
    description: "مدیریت نسخه و کنترل تغییرات پروژه",
    level: "Learning",
    icon: GitBranch,
  },
];

function SkillsSection() {
  return (
    <section className="skills-section">

      <SectionTitle
        eyebrow="SKILLS & TECHNOLOGIES"
        title="مهارت‌ها و تکنولوژی‌ها"
        description="ابزارها و تکنولوژی‌هایی که برای ساخت تجربه‌های دیجیتال مدرن استفاده می‌کنم."
        align="right"
      />

      <div className="skills-grid">

        {skills.map((skill, index) => {
          const Icon = skill.icon;

          return (
            <motion.div
              key={skill.title}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <GlassCard className="skill-card">

                <div className="skill-card-top">
                  <div className="skill-icon">
                    <Icon
                      size={25}
                      strokeWidth={1.5}
                    />
                  </div>

                  <span className="skill-index">
                    0{index + 1}
                  </span>
                </div>

                <div className="skill-card-content">

                  <h3>{skill.title}</h3>

                  <p>
                    {skill.description}
                  </p>

                </div>

                <span className="skill-level">
                  {skill.level}
                </span>

              </GlassCard>
            </motion.div>
          );
        })}

      </div>

    </section>
  );
}

export default SkillsSection;