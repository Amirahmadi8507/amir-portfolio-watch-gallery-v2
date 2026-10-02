import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
} from "lucide-react";

import { useCart } from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import useAuth from "../../hooks/useAuth";
import { useSiteSettings } from "../../context/useSiteSettings";
function ShopHeader() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { settings } = useSiteSettings();

  return (
    <header className="shop-header">
      <div className="shop-header-brand">
        <Link to="/shop">
          <span className="brand-dot"></span>
          <div>
        <span>
        {settings.siteName}
      </span>
          </div>
        </Link>
      </div>

      <nav className="shop-header-links">
        <Link to="/shop">خانه</Link>
        <Link to="/shop/products">محصولات</Link>
        <Link to="/shop/categories">دسته‌بندی‌ها</Link>
        <Link to="/shop/about">درباره ما</Link>
      </nav>

      <div className="shop-header-actions">
        {user ? (
  <div className="shop-user">
  <Link
    to="/shop/account"
    className="shop-user-profile"
    aria-label="حساب کاربری"
  >
    <div className="shop-user-avatar">
      {user.name?.charAt(0)}
    </div>

    <span className="shop-user-name">
      {user.name}
    </span>
  </Link>

  <button
    type="button"
    className="shop-logout-button"
    onClick={logout}
  >
    خروج
  </button>
</div>
) : (
  <Link
    to="/shop/auth"
    className="shop-login-button"
  >
    ورود
  </Link>
)}
        <Link
          to="/shop/search"
          className="shop-header-icon"
          aria-label="جستجو"
        >
          <Search size={18} />
        </Link>

        <Link
          to="/shop/wishlist"
          className="shop-header-icon"
          aria-label="علاقه‌مندی‌ها"
        >
          <Heart size={18} />

          {wishlist.length > 0 && (
            <span>{wishlist.length}</span>
          )}
        </Link>

        <Link
          to="/shop/cart"
          className="shop-header-icon"
          aria-label="سبد خرید"
        >
          <ShoppingCart size={18} />

          {cartCount > 0 && (
            <span>{cartCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default ShopHeader;