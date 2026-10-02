import { useRef } from "react";

/*
  tilt = true  →  کارت در فضای سه‌بعدی با موس کج می‌شود و بازتاب نور دارد
*/

function GlassCard({ children, className = "", tilt = false, ...rest }) {
  const ref = useRef(null);

  if (!tilt) {
    return (
      <div className={`glass-card ${className}`} {...rest}>
        {children}
      </div>
    );
  }

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    node.style.setProperty("--tilt-x", `${(0.5 - py) * 12}deg`);
    node.style.setProperty("--tilt-y", `${(px - 0.5) * 14}deg`);
    node.style.setProperty("--glare-x", `${px * 100}%`);
    node.style.setProperty("--glare-y", `${py * 100}%`);
  };

  const handleLeave = () => {
    const node = ref.current;
    if (!node) return;

    node.style.setProperty("--tilt-x", "0deg");
    node.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      ref={ref}
      className={`glass-card tilt-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </div>
  );
}

export default GlassCard;
