import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, ArrowUpLeft, X } from "lucide-react";
import { motion } from "framer-motion";

import { useProducts } from "../../context/useProducts";
import GlassCard from "../../components/common/GlassCard";

function Search() {
  const { products } = useProducts();

  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [search, setSearch] = useState(initialQuery);

  const results = useMemo(() => {

    const query = search.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return products.filter((product) => {

      const searchableText = `
        ${product.name || ""}
        ${product.brand || ""}
        ${product.category || ""}
        ${product.type || ""}
        ${product.description || ""}
      `.toLowerCase();

      return searchableText.includes(query);

    });

  }, [products, search]);

  return (
    <section className="products-page">

      <div className="category-products-heading">

        <span className="admin-eyebrow">
          SEARCH
        </span>

        <h1>
          جستجوی <span>محصولات</span>
        </h1>

        <p>
          محصول موردنظر خود را در میان مجموعه ساعت‌ها پیدا کنید.
        </p>

      </div>

      {/* Search */}
      <div className="products-toolbar">

        <div className="products-search">

          <SearchIcon size={18} />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="نام ساعت، برند یا دسته‌بندی..."
            autoFocus
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

      </div>

      {/* Result Count */}
      {search.trim() && (
        <div className="products-result-info">

          <span>
            {results.length.toLocaleString("fa-IR")} محصول پیدا شد
          </span>

          <span>
            جستجو برای: «{search}»
          </span>

        </div>
      )}

      {/* Results */}
      {results.length > 0 ? (

        <div className="products-grid">

          {results.map((product, index) => (

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
                delay: index * 0.05,
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

          <SearchIcon size={35} />

          <h3>
            {search.trim()
              ? "محصولی پیدا نشد"
              : "جستجوی خود را شروع کنید"}
          </h3>

          <p>
            {search.trim()
              ? "عبارت دیگری را امتحان کنید."
              : "نام ساعت، برند یا دسته‌بندی را وارد کنید."}
          </p>

          {search.trim() && (
            <Link to="/shop/products">
              مشاهده همه محصولات
            </Link>
          )}

        </div>

      )}

    </section>
  );
}

export default Search;