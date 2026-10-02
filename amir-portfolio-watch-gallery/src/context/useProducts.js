import { useContext } from "react";

import ProductContext from "./ProductContext";

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProducts باید داخل ProductProvider استفاده شود."
    );
  }

  return context;
}