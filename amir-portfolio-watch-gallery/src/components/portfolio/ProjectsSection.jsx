import { motion } from "framer-motion";
import {
  ArrowUpLeft,
  ExternalLink,
} from "lucide-react";

import GlassCard from "../common/GlassCard";
import SectionTitle from "../common/SectionTitle";

const projects = [
  {
    number: "01",
    title: "Watch Gallery",
    description:
      "یک گالری ساعت لوکس با طراحی مدرن، رابط کاربری تعاملی و تجربه سه‌بعدی.",
    category: "3D E-Commerce",
    technologies: ["React", "Three.js", "CSS"],
    image: "/projects/portfolio-showcase.png",
  },
  {
    number: "02",
    title: "Creative Portfolio",
    description:
      "پورتفولیوی شخصی با تمرکز روی طراحی اختصاصی، انیمیشن و تجربه کاربری.",
    category: "Portfolio",
    technologies: ["React", "Framer Motion", "CSS"],
    image: "/projects/portfolio-showcase.png",
  },
  {
    number: "03",
    title: "Modern Dashboard",
    description:
      "یک داشبورد مدرن با ساختار کامپوننت‌محور و رابط کاربری تمیز.",
    category: "UI / Front-End",
    technologies: ["React", "JavaScript", "CSS"],
    image: "/projects/portfolio-showcase.png",
  },
];

function ProjectsSection() {
  return (
    <section className="projects-section">

      <SectionTitle
        eyebrow="SELECTED PROJECTS"
        title="پروژه‌های منتخب"
        description="بخشی از پروژه‌هایی که برای نمایش مهارت‌ها و نگاه من به طراحی دیجیتال ساخته شده‌اند."
        align="right"
      />

      <div className="projects-grid">

        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            className="project-card"
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
              amount: 0.15,
            }}
            transition={{
              duration: 0.7,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <GlassCard tilt>

              {/* Project Image */}

              <div className="project-image">

                <img
                  src={project.image}
                  alt={project.title}
                />

                <div className="project-image-overlay">
                  <span>
                    مشاهده پروژه
                  </span>

                  <ArrowUpLeft
                    size={20}
                    strokeWidth={1.5}
                  />
                </div>

              </div>

              {/* Project Content */}

              <div className="project-content">

                <div className="project-top">

                  <span className="project-number">
                    {project.number}
                  </span>

                  <span className="project-category">
                    {project.category}
                  </span>

                </div>

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>

                {/* Technologies */}

                <div className="project-technologies">

                  {project.technologies.map(
                    (technology) => (
                      <span key={technology}>
                        {technology}
                      </span>
                    )
                  )}

                </div>

                {/* Links */}

                <div className="project-links">

                  <button
                    type="button"
                    aria-label={`مشاهده ${project.title}`}
                  >
                    <ExternalLink
                      size={18}
                      strokeWidth={1.6}
                    />
                  </button>

                  {/* <button
                    type="button"
                    aria-label={`گیت‌هاب ${project.title}`}
                  >
                    <Github
                      size={18}
                      strokeWidth={1.6}
                    />
                  </button> */}

                </div>

              </div>

            </GlassCard>

          </motion.article>
        ))}

      </div>

    </section>
  );
}

export default ProjectsSection;