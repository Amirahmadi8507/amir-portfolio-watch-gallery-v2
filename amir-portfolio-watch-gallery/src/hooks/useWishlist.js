import { useContext } from "react";
import WishlistContext from "../context/wishlistContextValue";

function useWishlist() {
  return useContext(WishlistContext);
}

export default useWishlist;