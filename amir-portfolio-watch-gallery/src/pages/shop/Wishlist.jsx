import { Link } from "react-router-dom";
import {
  Heart,
  Trash2,
  ArrowUpLeft,
} from "lucide-react";

import GlassCard from "../../components/common/GlassCard";
import useWishlist from "../../hooks/useWishlist";

function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <section className="wishlist-page wishlist-empty">

        <Heart size={45} />

        <h1>
          لیست علاقه‌مندی خالی است
        </h1>

        <p>
          محصولاتی که دوست دارید را به این لیست اضافه کنید.
        </p>

        <Link to="/shop/products">
          مشاهده محصولات
        </Link>

      </section>
    );
  }

  return (
    <section className="wishlist-page">

      <div className="wishlist-header">
        <span>
          YOUR WISHLIST
        </span>

        <h1>
          علاقه‌مندی‌ها
        </h1>
      </div>

      <div className="wishlist-grid">

        {wishlist.map((product) => (
          <GlassCard
            key={product.id}
            className="wishlist-card"
          >

            <div className="wishlist-image">
              <img
                src={product.image}
                alt={product.name}
              />

              <button
                type="button"
                onClick={() =>
                  removeFromWishlist(product.id)
                }
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="wishlist-content">

              <span>
                {product.brand}
              </span>

              <h3>
                {product.name}
              </h3>

              <strong>
                {product.price.toLocaleString("fa-IR")}
                <small> تومان</small>
              </strong>

              <Link
                to={`/shop/product/${product.id}`}
              >
                مشاهده محصول
                <ArrowUpLeft size={16} />
              </Link>

            </div>

          </GlassCard>
        ))}

      </div>

    </section>
  );
}

export default Wishlist;