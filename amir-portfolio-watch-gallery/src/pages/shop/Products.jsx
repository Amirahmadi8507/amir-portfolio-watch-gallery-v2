import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  ArrowUpLeft,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useProducts } from "../../context/useProducts";
import GlassCard from "../../components/common/GlassCard";
import SectionTitle from "../../components/common/SectionTitle";

function Products() {
  const { products } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((product) =>
        `${product.name} ${product.brand} ${product.description}`
          .toLowerCase()
          .includes(query)
      );
    }

    if (category !== "all") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <section className="products-page">

      <SectionTitle
        eyebrow="WATCH COLLECTION"
        title="مجموعه ساعت‌ها"
        description="ساعت موردنظر خود را از میان مجموعه‌ای از مدل‌های کلاسیک، لوکس، مینیمال و اسپرت پیدا کنید."
        align="right"
      />

      {/* Toolbar */}
      <div className="products-toolbar">

        <div className="products-search">
          <Search size={18} />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="جستجوی ساعت..."
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              style={{
                display: "flex",
                border: "none",
                background: "transparent",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button
          type="button"
          className="products-filter-button"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={17} />
          فیلتر و مرتب‌سازی
        </button>

      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="products-filters"
        >

          <div className="filter-group">
            <span>دسته‌بندی</span>

            <div className="filter-options">

              <button
                className={category === "all" ? "active" : ""}
                onClick={() => setCategory("all")}
              >
                همه
              </button>

              <button
                className={category === "classic" ? "active" : ""}
                onClick={() => setCategory("classic")}
              >
                کلاسیک
              </button>

              <button
                className={category === "luxury" ? "active" : ""}
                onClick={() => setCategory("luxury")}
              >
                لوکس
              </button>

              <button
                className={category === "minimal" ? "active" : ""}
                onClick={() => setCategory("minimal")}
              >
                مینیمال
              </button>

              <button
                className={category === "sport" ? "active" : ""}
                onClick={() => setCategory("sport")}
              >
                اسپرت
              </button>

            </div>
          </div>

          <div className="filter-group">
            <span>مرتب‌سازی</span>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="default">
                پیش‌فرض
              </option>

              <option value="newest">
                جدیدترین
              </option>

              <option value="price-low">
                ارزان‌ترین
              </option>

              <option value="price-high">
                گران‌ترین
              </option>

              <option value="rating">
                بالاترین امتیاز
              </option>
            </select>
          </div>

        </motion.div>
      )}

      {/* Result info */}
      <div className="products-result-info">
        <span>
          {filteredProducts.length.toLocaleString("fa-IR")} محصول
        </span>

        <span>
          AM Watch Gallery
        </span>
      </div>

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">

          {filteredProducts.map((product, index) => (
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
                amount: 0.08,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
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

                    <div className="product-card-arrow">
                      <ArrowUpLeft size={19} />
                    </div>

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
            محصولی پیدا نشد
          </h3>

          <p>
            عبارت جستجو یا فیلتر انتخابی را تغییر دهید.
          </p>
        </div>
      )}

    </section>
  );
}

export default Products;