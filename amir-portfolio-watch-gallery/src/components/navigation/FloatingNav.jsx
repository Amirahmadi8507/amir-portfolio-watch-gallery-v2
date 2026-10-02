import { NavLink } from "react-router-dom";
import {
  Home,
  UserRound,
  ShoppingBag,
  Layers3,
  Heart,
  ShoppingCart,
  Mail,
} from "lucide-react";

import { useCart } from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

const navItems = [
  {
    path: "/",
    label: "خانه",
    icon: Home,
  },
  {
    path: "/portfolio",
    label: "پورتفولیو",
    icon: UserRound,
  },
  {
    path: "/shop",
    label: "گالری ساعت",
    icon: ShoppingBag,
  },
  {
    path: "/shop/categories",
    label: "دسته‌بندی‌ها",
    icon: Layers3,
  },
  {
    path: "/shop/wishlist",
    label: "علاقه‌مندی‌ها",
    icon: Heart,
  },
  {
    path: "/shop/cart",
    label: "سبد خرید",
    icon: ShoppingCart,
  },
  {
    path: "/contact",
    label: "تماس",
    icon: Mail,
  },
];

function FloatingNav() {
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  return (
    <nav
      className="floating-nav"
      aria-label="ناوبری اصلی"
    >
      <div className="floating-nav-inner">

        <div className="nav-brand">
          <span className="brand-dot"></span>
          <span>AM</span>
        </div>

        <div className="nav-items">

          {navItems.map((item) => {
            const Icon = item.icon;

            const isCart =
              item.path === "/shop/cart";

            const isWishlist =
              item.path === "/shop/wishlist";

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-item ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <Icon
                  size={19}
                  strokeWidth={1.7}
                />

                {isCart && cartCount > 0 && (
                  <span className="nav-count">
                    {cartCount}
                  </span>
                )}

                {isWishlist &&
                  wishlist.length > 0 && (
                    <span className="nav-count">
                      {wishlist.length}
                    </span>
                  )}

                <span className="nav-tooltip">
                  {item.label}
                </span>

              </NavLink>
            );
          })}

        </div>

      </div>
    </nav>
  );
}

export default FloatingNav;