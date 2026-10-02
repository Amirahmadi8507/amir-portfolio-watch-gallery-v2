import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Layers3 } from "lucide-react";

import SectionTitle from "../common/SectionTitle";
import WatchStage from "../three/WatchStage";

const parts = [
  { at: 0, title: "ساعت کامل", text: "همه‌ی قطعات کنار هم؛ آماده‌ی مچ دست." },
  { at: 0.34, title: "شیشه‌ی سافایر", text: "لایه‌ی بالایی که صفحه را در برابر خش محافظت می‌کند." },
  { at: 0.58, title: "عقربه‌ها و صفحه", text: "عقربه‌ها با زمان واقعی حرکت می‌کنند." },
  { at: 0.82, title: "بدنه و بند", text: "بدنه‌ی فلزی و بند در عقب‌ترین لایه‌ها قرار دارند." },
];

/*
  بخش «کالبدشکافی ساعت»:
  با اسکرول کردن، قطعات ساعت روی محور Z از هم باز می‌شوند.
*/

function ExplodedWatchSection() {
  const sectionRef = useRef(null);
  const explodeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.4"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const clamped = Math.min(1, Math.max(0, value));

    if (manual === null) {
      explodeRef.current = clamped;
    }

    let index = 0;
    parts.forEach((part, i) => {
      if (clamped >= part.at) index = i;
    });
    setActive(index);
  });

  useEffect(() => {
    if (manual !== null) explodeRef.current = manual;
  }, [manual]);

  return (
    <section className="exploded-section" ref={sectionRef}>
      <SectionTitle
        eyebrow="ANATOMY"
        title="کالبدشکافی یک ساعت"
        description="اسکرول کنید یا اسلایدر را بکشید تا لایه‌های ساعت از هم باز شوند. ساعت را با موس بچرخانید."
        align="right"
      />

      <div className="exploded-grid">
        <motion.div
          className="exploded-stage"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <WatchStage
            category="luxury"
            controls
            autoRotate={false}
            float={false}
            sparkles
            explodeRef={explodeRef}
            scale={0.95}
            cameraZ={8.5}
          />

          <label className="exploded-slider">
            <Layers3 size={16} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0"
              onChange={(e) => setManual(Number(e.target.value))}
              aria-label="میزان باز شدن قطعات"
            />
          </label>
        </motion.div>

        <div className="exploded-list">
          {parts.map((part, i) => (
            <div
              key={part.title}
              className={`exploded-item ${i === active ? "active" : ""}`}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{part.title}</h3>
                <p>{part.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExplodedWatchSection;
