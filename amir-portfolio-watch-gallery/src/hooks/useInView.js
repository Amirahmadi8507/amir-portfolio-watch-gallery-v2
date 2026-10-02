import { useEffect, useRef, useState } from "react";

/*
  تشخیص اینکه المان در صفحه دیده می‌شود یا نه.
  مرورگرها تعداد WebGL Context را محدود می‌کنند، پس Canvas ها
  فقط وقتی دیده می‌شوند ساخته می‌شوند و بعد از خروج از دید حذف می‌شوند.
*/

export function useInView(rootMargin = "200px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    if (!window.matchMedia) return undefined;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(query.matches);

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
