import { useEffect, useState } from "react";

import ProductContext from "./ProductContext";
import productsData from "../data/products";

function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem("am-products");

      if (savedProducts) {
        return JSON.parse(savedProducts);
      }

      return productsData;
    } catch (error) {
      console.error("خطا در دریافت محصولات:", error);

      return productsData;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "am-products",
      JSON.stringify(products)
    );
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
    };

    setProducts((currentProducts) => [
      ...currentProducts,
      newProduct,
    ]);

    return newProduct;
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              ...updatedProduct,
              id,
            }
          : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== id
      )
    );
  };

  const getProductById = (id) => {
    return products.find(
      (product) =>
        String(product.id) === String(id)
    );
  };

  const resetProducts = () => {
    setProducts(productsData);
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    resetProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;