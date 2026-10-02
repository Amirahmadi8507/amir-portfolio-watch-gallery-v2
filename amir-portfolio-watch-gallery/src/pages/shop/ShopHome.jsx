import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowUpLeft,
  Sparkles,
  ShoppingBag,
  Search,
  Crown,
  Watch,
  Gem,
} from "lucide-react";

import { Link } from "react-router-dom";

import products from "../../data/products";
import GlassCard from "../../components/common/GlassCard";
import Button from "../../components/common/Button";
import WatchShowcase from "./WatchShowcase";
import WatchStage from "../../components/three/WatchStage";

function ShopHome() {
  const featuredProducts = products.slice(0, 6);

  const categories = [
    {
      id: "luxury",
      title: "لوکس",
      english: "LUXURY",
      description: "برای لحظه‌های خاص",
      icon: Crown,
    },
    {
      id: "classic",
      title: "کلاسیک",
      english: "CLASSIC",
      description: "زمانی فراتر از ترند",
      icon: Watch,
    },
    {
      id: "minimal",
      title: "مینیمال",
      english: "MINIMAL",
      description: "سادگی با شخصیت",
      icon: Gem,
    },
    {
      id: "sport",
      title: "اسپرت",
      english: "SPORT",
      description: "برای سبک زندگی پویا",
      icon: Sparkles,
    },
  ];

  const heroProduct = products[1] || products[0];

  /* =========================================================
     HERO PARALLAX
  ========================================================= */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const springY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const watchX = useTransform(
    springX,
    [-1, 1],
    [-18, 18]
  );

  const watchY = useTransform(
    springY,
    [-1, 1],
    [-12, 12]
  );

  const ringX = useTransform(
    springX,
    [-1, 1],
    [12, -12]
  );

  const ringY = useTransform(
    springY,
    [-1, 1],
    [8, -8]
  );

  const handleHeroMouseMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width;

    const y =
      (event.clientY - rect.top) /
      rect.height;

    mouseX.set(x * 2 - 1);
    mouseY.set(y * 2 - 1);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="shop-home">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="shop-hero"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >

        <div className="shop-hero-noise" />

        {/* Background Orbits */}

        <motion.div
          className="shop-hero-orbit orbit-one"
          style={{
            x: ringX,
            y: ringY,
          }}
        />

        <motion.div
          className="shop-hero-orbit orbit-two"
          style={{
            x: watchX,
            y: watchY,
          }}
        />

        {/* Floating Particles */}

        <motion.span
          className="shop-particle particle-one"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.span
          className="shop-particle particle-two"
          animate={{
            y: [0, 18, 0],
            x: [0, 10, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.span
          className="shop-particle particle-three"
          animate={{
            y: [0, -15, 0],
            x: [0, -8, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ===================================================
            HERO CONTENT
        =================================================== */}

        <motion.div
          className="shop-hero-content"
          initial={{
            opacity: 0,
            x: 60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <motion.span
            className="shop-eyebrow"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
              duration: 0.6,
            }}
          >
            <Sparkles size={15} />
            AM WATCH GALLERY
          </motion.span>

          <motion.h1
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.25,
              duration: 0.7,
            }}
          >
            زمان را
            <span> متفاوت ببین.</span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 0.7,
            }}
          >
            مجموعه‌ای از ساعت‌های خاص با طراحی لوکس،
            جزئیات دقیق و استایلی که برای ماندگار شدن
            ساخته شده است.
          </motion.p>

          <motion.div
            className="shop-hero-actions"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.55,
              duration: 0.7,
            }}
          >

            <Link to="/shop/products">
              <Button variant="primary">
                مشاهده مجموعه
                <ArrowLeft size={17} />
              </Button>
            </Link>

            <Link
              to="/shop/categories"
              className="shop-secondary-link"
            >
              دسته‌بندی‌ها
              <ArrowUpLeft size={17} />
            </Link>

            <Link
              to="/shop/search"
              className="shop-secondary-link"
            >
              جستجو
              <Search size={16} />
            </Link>

          </motion.div>

          {/* Stats */}

          <motion.div
            className="shop-hero-stats"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.7,
              duration: 0.7,
            }}
          >

            <div>
              <strong>۱۸+</strong>
              <span>مدل ساعت</span>
            </div>

            <div>
              <strong>۴</strong>
              <span>دسته‌بندی</span>
            </div>

            <div>
              <strong>۴.۸</strong>
              <span>امتیاز مجموعه</span>
            </div>

          </motion.div>

        </motion.div>

        {/* ===================================================
            HERO VISUAL
        =================================================== */}

        <motion.div
          className="shop-hero-visual"
          style={{
            x: watchX,
            y: watchY,
          }}
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <div className="shop-hero-glow" />

          {/* Rotating Rings */}

          <motion.div
            className="shop-hero-ring ring-one"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            className="shop-hero-ring ring-two"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Watch */}

          <motion.div
            className="shop-hero-watch"
            animate={{
              y: [0, -10, 0],
              rotate: [-1, 1, -1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >

            <WatchStage
              category={heroProduct.category}
              className="shop-hero-stage"
              cameraZ={6.8}
            />

          </motion.div>

          {/* Product Label */}

          <motion.div
            className="shop-floating-label"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >

            <ShoppingBag size={16} />

            <div>
              <span>FEATURED WATCH</span>

              <strong>
                {heroProduct.name}
              </strong>
            </div>

          </motion.div>

          {/* Floating Dots */}

          <motion.div
            className="shop-hero-floating-dot dot-one"
            animate={{
              y: [0, -16, 0],
              x: [0, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="shop-hero-floating-dot dot-two"
            animate={{
              y: [0, 12, 0],
              x: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="shop-hero-floating-dot dot-three"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

        </motion.div>

      </section>


      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}

      <section className="featured-products">

        <div className="shop-section-heading">

          <div>
            <span>FEATURED COLLECTION</span>

            <h2>
              منتخب‌های AM
            </h2>
          </div>

          <Link to="/shop/products">
            مشاهده همه
            <ArrowLeft size={16} />
          </Link>

        </div>

        <div className="featured-products-grid">

          {featuredProducts.map((product, index) => (

            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 45,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.12,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <Link
                to={`/shop/product/${product.id}`}
                className="product-card-link"
              >

                <GlassCard className="featured-product-card">

                  <div className="featured-product-image">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    {product.badge && (
                      <span className="product-badge">
                        {product.badge}
                      </span>
                    )}

                    <div className="product-image-arrow">
                      <ArrowUpLeft size={19} />
                    </div>

                  </div>

                  <div className="featured-product-content">

                    <div className="featured-product-meta">

                      <span>
                        {product.brand}
                      </span>

                      <span>
                        ★ {product.rating}
                      </span>

                    </div>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      {product.description}
                    </p>

                    <div className="featured-product-price">

                      <strong>
                        {product.price.toLocaleString(
                          "fa-IR"
                        )}{" "}
                        تومان
                      </strong>

                      {product.oldPrice && (
                        <del>
                          {product.oldPrice.toLocaleString(
                            "fa-IR"
                          )}
                        </del>
                      )}

                    </div>

                  </div>

                </GlassCard>

              </Link>

            </motion.div>

          ))}

        </div>

      </section>


      {/* =====================================================
          INTERACTIVE SHOWCASE
      ===================================================== */}

      <WatchShowcase />


      {/* =====================================================
          CATEGORIES
      ===================================================== */}

     {/* =====================================================
    CATEGORIES
===================================================== */}

<section className="shop-categories">

  <div className="shop-section-heading">

    <div>
      <span>EXPLORE COLLECTIONS</span>

      <h2>
        سبک خودت را پیدا کن
      </h2>
    </div>

    <Link to="/shop/categories">
      همه دسته‌بندی‌ها
      <ArrowLeft size={16} />
    </Link>

  </div>

  <div className="shop-categories-visual">

    {categories.map((category, index) => {

      const Icon = category.icon;

      return (
        <motion.div
          key={category.id}
          className="shop-category-visual-wrapper"
          initial={{
            opacity: 0,
            y: 35,
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
            duration: 0.6,
            delay: index * 0.08,
          }}
        >

          <Link
            to={`/shop/category/${category.id}`}
            className="shop-category-visual-card"
          >

            {/* Number */}

            <span className="shop-category-number">
              0{index + 1}
            </span>

            {/* Icon */}

            <div className="shop-category-visual-icon">
              <Icon size={32} strokeWidth={1.4} />
            </div>

            {/* Main Content */}

            <div className="shop-category-visual-content">

              <span className="shop-category-english">
                {category.english}
              </span>

              <h3>
                {category.title}
              </h3>

              <p>
                {category.description}
              </p>

            </div>

            {/* Arrow */}

            <div className="shop-category-visual-arrow">
              <ArrowUpLeft size={21} />
            </div>

            {/* Decorative Line */}

            <div className="shop-category-line" />

            {/* Background Number */}

            <span className="shop-category-background-number">
              {String(index + 1).padStart(2, "0")}
            </span>

          </Link>

        </motion.div>
      );
    })}

  </div>

</section>

      {/* =====================================================
          BRAND STORY
      ===================================================== */}

      <section className="shop-story">

        <div className="shop-story-glow" />

        <motion.div
          className="shop-story-content"
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
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          <span>
            THE AM PHILOSOPHY
          </span>

          <h2>
            یک ساعت،
            <br />
            بیشتر از یک اکسسوری است.
          </h2>

          <p>
            ما باور داریم انتخاب یک ساعت فقط درباره
            نمایش زمان نیست؛ درباره شخصیتی است که
            همراه خودت حمل می‌کنی.
          </p>

          <Link to="/shop/about">
            بیشتر درباره ما
            <ArrowLeft size={17} />
          </Link>

        </motion.div>


        <motion.div
          className="shop-story-symbol"
          initial={{
            opacity: 0,
            scale: 0.7,
            rotate: -20,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
          }}
        >

          <div className="shop-story-circle">
            <span>
              AM
            </span>
          </div>

          <div className="shop-story-ring" />

        </motion.div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="shop-final-cta">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <span>
            AM WATCH GALLERY
          </span>

          <h2>
            وقتشه ساعت
            <br />
            خودت رو پیدا کنی.
          </h2>

          <Link to="/shop/products">

            <Button variant="primary">
              مشاهده مجموعه
              <ArrowLeft size={17} />
            </Button>

          </Link>

        </motion.div>

      </section>

    </section>
  );
}

export default ShopHome;