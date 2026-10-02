import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

import GlassCard from "../../components/common/GlassCard";
import { useCart } from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
function Cart() {
  const { isAuthenticated } = useAuth();
  const {
    cart,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <section className="cart-page cart-empty-page">

        <ShoppingBag size={45} />

        <h1>
          سبد خرید خالی است
        </h1>

        <p>
          هنوز محصولی به سبد خرید اضافه نکرده‌اید.
        </p>

        <Link
          to="/shop/products"
          className="cart-empty-button"
        >
          مشاهده محصولات
          <ArrowRight size={17} />
        </Link>

      </section>
    );
  }

  return (
    <section className="cart-page">

      <div className="cart-header">
        <div>
          <span>YOUR CART</span>

          <h1>
            سبد خرید
          </h1>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="clear-cart-button"
        >
          پاک کردن سبد
        </button>
      </div>

      <div className="cart-layout">

        <div className="cart-items">

          {cart.map((item) => (
            <GlassCard
              key={item.id}
              className="cart-item"
            >

              <div className="cart-item-image">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <div className="cart-item-info">

                <span>
                  {item.brand}
                </span>

                <h3>
                  {item.name}
                </h3>

                <strong>
                  {item.price.toLocaleString("fa-IR")}
                  <small> تومان</small>
                </strong>

              </div>

              <div className="cart-item-actions">

                <div className="quantity-control">

                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    <Minus size={14} />
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    <Plus size={14} />
                  </button>

                </div>

                <button
                  type="button"
                  className="remove-cart-item"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  <Trash2 size={17} />
                </button>

              </div>

            </GlassCard>
          ))}

        </div>

        <GlassCard className="cart-summary">

          <span>
            ORDER SUMMARY
          </span>

          <h2>
            خلاصه سفارش
          </h2>

          <div className="cart-summary-row">
            <span>
              تعداد محصولات
            </span>

            <strong>
              {cartCount.toLocaleString("fa-IR")}
            </strong>
          </div>

          <div className="cart-summary-row">
            <span>
              ارسال
            </span>

            <strong>
              رایگان
            </strong>
          </div>

          <div className="cart-summary-total">
            <span>
              مبلغ نهایی
            </span>

            <strong>
              {cartTotal.toLocaleString("fa-IR")}
              <small> تومان</small>
            </strong>
          </div>

<Link
  to={isAuthenticated ? "/shop/checkout" : "/shop/auth"}
  className="checkout-button"
>
  ادامه و ثبت سفارش
  <ArrowRight size={17} />
</Link>

        </GlassCard>

      </div>

    </section>
  );
}

export default Cart;