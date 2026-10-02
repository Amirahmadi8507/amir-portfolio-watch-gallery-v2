import { useEffect, useState } from "react";
import WishlistContext from "./wishlistContextValue";

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("am-wishlist");

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "am-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentWishlist, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (item) => item.id !== productId
      )
    );
  };

  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;