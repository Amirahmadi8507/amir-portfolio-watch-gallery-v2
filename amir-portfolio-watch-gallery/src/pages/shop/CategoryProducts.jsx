import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { motion } from "framer-motion";

import { useProducts } from "../../context/useProducts";
import GlassCard from "../../components/common/GlassCard";

const categoryNames = {
  classic: "کلاسیک",
  luxury: "لوکس",
  minimal: "مینیمال",
  sport: "اسپرت",
};

function CategoryProducts() {
  const { category } = useParams();
  const { products } = useProducts();

  const categoryProducts = useMemo(() => {
    return products.filter(
      (product) => product.category === category
    );
  }, [products, category]);

  const categoryTitle =
    categoryNames[category] || category;

  return (
    <section className="products-page">

      <div className="product-details-breadcrumb">

        <Link to="/shop">
          فروشگاه
        </Link>

        <ArrowRight size={15} />

        <Link to="/shop/categories">
          دسته‌بندی‌ها
        </Link>

        <ArrowRight size={15} />

        <span>
          {categoryTitle}
        </span>

      </div>

      <div className="category-products-heading">

        <span className="admin-eyebrow">
          WATCH CATEGORY
        </span>

        <h1>
          ساعت‌های <span>{categoryTitle}</span>
        </h1>

        <p>
          مجموعه ساعت‌های دسته‌بندی {categoryTitle}
        </p>

      </div>

      {categoryProducts.length > 0 ? (

        <div className="products-grid">

          {categoryProducts.map((product, index) => (

            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
              }}
            >

              <Link
                to={`/shop/product/${product.id}`}
                className="product-link"
              >

                <GlassCard className="product-card" tilt>

                  <div className="product-card-image">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    {product.badge && (
                      <span className="product-card-badge">
                        {product.badge}
                      </span>
                    )}

                  </div>

                  <div className="product-card-content">

                    <div className="product-card-meta">

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

                    <div className="product-card-bottom">

                      <strong>
                        {product.price.toLocaleString("fa-IR")}
                        <small> تومان</small>
                      </strong>

                      {product.oldPrice && (
                        <del>
                          {product.oldPrice.toLocaleString("fa-IR")}
                        </del>
                      )}

                    </div>

                  </div>

                </GlassCard>

              </Link>

            </motion.div>

          ))}

        </div>

      ) : (

        <div className="products-empty">

          <Search size={35} />

          <h3>
            محصولی در این دسته‌بندی وجود ندارد
          </h3>

          <p>
            ممکن است محصولات این دسته‌بندی توسط مدیر حذف شده باشند.
          </p>

          <Link to="/shop/products">
            مشاهده همه محصولات
            <ArrowRight size={17} />
          </Link>

        </div>

      )}

    </section>
  );
}

export default CategoryProducts;