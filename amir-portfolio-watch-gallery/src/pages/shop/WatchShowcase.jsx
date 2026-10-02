import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

import products from "../../data/products";
import WatchStage from "../../components/three/WatchStage";

function WatchShowcase() {
  const showcaseProducts = products.slice(0, 4);

  const [activeIndex, setActiveIndex] = useState(0);

  const activeProduct = showcaseProducts[activeIndex];

  const nextProduct = () => {
    setActiveIndex((current) =>
      current === showcaseProducts.length - 1
        ? 0
        : current + 1
    );
  };

  const previousProduct = () => {
    setActiveIndex((current) =>
      current === 0
        ? showcaseProducts.length - 1
        : current - 1
    );
  };

  if (!activeProduct) {
    return null;
  }

  return (
    <section className="watch-showcase">

      {/* Background */}

      <div className="watch-showcase-glow" />

      <div className="watch-showcase-grid" />

      {/* Header */}

      <div className="watch-showcase-header">

        <div>
          <span className="watch-showcase-eyebrow">
            <Sparkles size={14} />
            AM SIGNATURE COLLECTION
          </span>

          <h2>
            انتخابی برای
            <span> خاص‌پسندها</span>
          </h2>
        </div>

        <div className="watch-showcase-counter">
          <strong>
            {String(activeIndex + 1).padStart(2, "0")}
          </strong>

          <span>
            /
            {String(showcaseProducts.length).padStart(2, "0")}
          </span>
        </div>

      </div>


      {/* Main */}

      <div className="watch-showcase-main">

        {/* Product Image */}

        <div className="watch-showcase-visual">

          <div className="showcase-orbit showcase-orbit-one" />
          <div className="showcase-orbit showcase-orbit-two" />

          <div className="showcase-image-glow" />

          <AnimatePresence mode="wait">

            <motion.div
              key={activeProduct.id}
              className="watch-showcase-image"
              initial={{
                opacity: 0,
                scale: 0.75,
                rotate: -8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                rotate: 8,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <WatchStage
                category={activeProduct.category}
                controls
                shadow
                className="showcase-stage"
              />
            </motion.div>

          </AnimatePresence>

          <div className="showcase-floating-tag">
            <ShoppingBag size={15} />
            <span>SELECTED</span>
          </div>

        </div>


        {/* Product Info */}

        <AnimatePresence mode="wait">

          <motion.div
            key={activeProduct.id}
            className="watch-showcase-info"
            initial={{
              opacity: 0,
              x: 35,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -25,
            }}
            transition={{
              duration: 0.45,
            }}
          >

            <span className="showcase-brand">
              {activeProduct.brand}
            </span>

            <h3>
              {activeProduct.name}
            </h3>

            <div className="showcase-rating">
              <span>★</span>
              <strong>{activeProduct.rating}</strong>
              <small>
                ({activeProduct.reviews} نظر)
              </small>
            </div>

            <p>
              {activeProduct.description}
            </p>

            <div className="showcase-features">

              {activeProduct.features
                .slice(0, 4)
                .map((feature) => (
                  <span key={feature}>
                    {feature}
                  </span>
                ))}

            </div>

            <div className="showcase-price">

              <strong>
                {activeProduct.price.toLocaleString("fa-IR")}
                <small> تومان</small>
              </strong>

              {activeProduct.oldPrice && (
                <del>
                  {activeProduct.oldPrice.toLocaleString("fa-IR")}
                </del>
              )}

            </div>

            <div className="showcase-actions">

              <Link
                to={`/shop/product/${activeProduct.id}`}
                className="showcase-main-button"
              >
                مشاهده محصول
                <ArrowLeft size={17} />
              </Link>

              <button
                type="button"
                className="showcase-nav-button"
                onClick={previousProduct}
                aria-label="محصول قبلی"
              >
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="showcase-nav-button"
                onClick={nextProduct}
                aria-label="محصول بعدی"
              >
                <ArrowLeft size={18} />
              </button>

            </div>

          </motion.div>

        </AnimatePresence>

      </div>


      {/* Product Selector */}

      <div className="watch-showcase-selector">

        {showcaseProducts.map((product, index) => (

          <button
            key={product.id}
            type="button"
            className={`showcase-selector-item ${
              index === activeIndex
                ? "active"
                : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >

            <div className="selector-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="selector-image">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>

            <div className="selector-info">
              <strong>
                {product.name}
              </strong>

              <span>
                {product.brand}
              </span>
            </div>

          </button>

        ))}

      </div>

    </section>
  );
}

export default WatchShowcase;