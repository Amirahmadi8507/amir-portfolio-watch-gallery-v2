
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  Star,
  ShoppingBag,
  Heart,
  Check,
  Box,
  Image as ImageIcon,
} from "lucide-react";
import { motion } from "framer-motion";

import { useProducts } from "../../context/useProducts";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import GlassCard from "../../components/common/GlassCard";
import WatchStage from "../../components/three/WatchStage";

function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();

  const { addToCart } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();

  const [viewMode, setViewMode] = useState("3d");

  const product = useMemo(() => {
    return products.find(
      (item) => String(item.id) === String(id)
    );
  }, [products, id]);

  if (!product) {
    return (
      <section className="product-details-page">
        <div className="products-empty">
          <ShoppingBag size={40} />

          <h2>محصول پیدا نشد</h2>

          <p>
            این محصول وجود ندارد یا ممکن است توسط مدیر حذف شده باشد.
          </p>

          <Link to="/shop/products">
            بازگشت به محصولات
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    );
  }

  const wishlistActive = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <section className="product-details-page">
      <div className="product-details-breadcrumb">
        <Link to="/shop">فروشگاه</Link>

        <ArrowRight size={15} />

        <Link to="/shop/products">
          محصولات
        </Link>

        <ArrowRight size={15} />

        <span>{product.name}</span>
      </div>

      <div className="product-details-grid">
        <motion.div
          initial={{
            opacity: 0,
            x: -35,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <GlassCard className="product-details-image-card">
            <div className="product-details-image">
              {viewMode === "3d" ? (
                <WatchStage
                  category={product.category}
                  controls
                  shadow
                  className="details-stage"
                />
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                />
              )}

              <div className="view-mode-toggle">
                <button
                  type="button"
                  className={viewMode === "3d" ? "active" : ""}
                  onClick={() => setViewMode("3d")}
                >
                  <Box size={15} />
                  سه‌بعدی
                </button>

                <button
                  type="button"
                  className={viewMode === "photo" ? "active" : ""}
                  onClick={() => setViewMode("photo")}
                >
                  <ImageIcon size={15} />
                  عکس
                </button>
              </div>

              {viewMode === "3d" && (
                <span className="view-mode-hint">
                  برای چرخاندن ساعت بکشید
                </span>
              )}

              {product.badge && (
                <span className="product-card-badge">
                  {product.badge}
                </span>
              )}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          className="product-details-content"
          initial={{
            opacity: 0,
            x: 35,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
        >
          <span className="product-details-brand">
            {product.brand}
          </span>

          <h1>{product.name}</h1>

          <div className="product-details-rating">
            <span>
              <Star
                size={16}
                fill="currentColor"
              />

              {product.rating}
            </span>

            <span>
              {product.reviews || 0} نظر
            </span>
          </div>

          <p className="product-details-description">
            {product.description}
          </p>

          <div className="product-details-price">
            <strong>
              {product.price.toLocaleString("fa-IR")}
              <small> تومان</small>
            </strong>

            {product.oldPrice && (
              <del>
                {product.oldPrice.toLocaleString("fa-IR")} تومان
              </del>
            )}
          </div>

          {product.features?.length > 0 && (
            <div className="product-details-features">
              <h3>ویژگی‌های محصول</h3>

              <div>
                {product.features.map(
                  (feature, index) => (
                    <span key={index}>
                      <Check size={15} />

                      {feature}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

          <div className="product-details-actions">
            <button
              type="button"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} />

              افزودن به سبد خرید
            </button>

            <button
              type="button"
              onClick={handleWishlist}
              aria-label={
                wishlistActive
                  ? "حذف از علاقه‌مندی‌ها"
                  : "افزودن به علاقه‌مندی‌ها"
              }
              className={
                wishlistActive
                  ? "wishlist-active"
                  : ""
              }
            >
              <Heart
                size={18}
                fill={
                  wishlistActive
                    ? "currentColor"
                    : "none"
                }
              />
            </button>
          </div>

          <Link
            to="/shop/products"
            className="product-details-back"
          >
            <ArrowRight size={17} />

            بازگشت به محصولات
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductDetails;