import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Package,
  Pencil,
  Trash2,
  Star,
  Eye,
  Filter,
  X,
  AlertTriangle,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useProducts } from "../../context/useProducts";

function AdminProducts() {
  const {
    products,
    deleteProduct,
  } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const categories = useMemo(() => {
    return [
      ...new Set(
        products.map(
          (product) => product.category
        )
      ),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchValue) ||
        product.brand
          .toLowerCase()
          .includes(searchValue);

      const matchesCategory =
        category === "all" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [
    products,
    search,
    category,
  ]);

  /* =========================
     OPEN DELETE MODAL
  ========================= */

  const handleDeleteClick = (product) => {
    setDeleteTarget(product);
  };

  /* =========================
     CONFIRM DELETE
  ========================= */

  const confirmDelete = () => {
    if (!deleteTarget) return;

    deleteProduct(deleteTarget.id);

    setDeleteTarget(null);
  };

  /* =========================
     CLOSE MODAL
  ========================= */

  const closeDeleteModal = () => {
    setDeleteTarget(null);
  };

  return (
    <section className="admin-products-page">

      {/* HEADER */}

      <div className="admin-products-top">

        <div>

          <span className="admin-eyebrow">
            PRODUCT MANAGEMENT
          </span>

          <h1>
            مدیریت
            <span> محصولات</span>
          </h1>

          <p>
            محصولات فروشگاه را از این قسمت
            مدیریت کن.
          </p>

        </div>

        <Link
          to="/admin/products/new"
          className="admin-add-product-btn"
        >
          <Plus size={18} />
          افزودن محصول
        </Link>

      </div>


      {/* TOOLBAR */}

      <div className="admin-products-toolbar">

        <div className="admin-product-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="جستجوی محصول یا برند..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              type="button"
              onClick={() =>
                setSearch("")
              }
              className="admin-search-clear"
              title="پاک کردن جستجو"
            >
              <X size={15} />
            </button>
          )}

        </div>


        <div className="admin-product-filter">

          <Filter size={17} />

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            <option value="all">
              همه دسته‌بندی‌ها
            </option>

            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>

        </div>

      </div>


      {/* SUMMARY */}

      <div className="admin-products-summary">

        <div>

          <Package size={19} />

          <span>
            تعداد محصولات
          </span>

          <strong>
            {products.length}
          </strong>

        </div>


        <div>

          <Eye size={19} />

          <span>
            نمایش نتایج
          </span>

          <strong>
            {filteredProducts.length}
          </strong>

        </div>

      </div>


      {/* PRODUCTS */}

      {filteredProducts.length === 0 ? (

        <div className="admin-products-empty">

          <Package size={38} />

          <h2>
            محصولی پیدا نشد
          </h2>

          <p>
            عبارت جستجو یا فیلتر دسته‌بندی
            را تغییر بده.
          </p>

        </div>

      ) : (

        <div className="admin-products-grid">

          {filteredProducts.map(
            (product) => (

              <article
                className="admin-product-card"
                key={product.id}
              >

                {/* IMAGE */}

                <div className="admin-product-image">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  {product.badge && (
                    <span className="admin-product-badge">
                      {product.badge}
                    </span>
                  )}


                  <div className="admin-product-overlay">

                    <Link
                      to={`/shop/product/${product.id}`}
                      title="مشاهده محصول"
                    >
                      <Eye size={17} />
                    </Link>


                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      title="ویرایش محصول"
                    >
                      <Pencil size={17} />
                    </Link>


                    <button
                      type="button"
                      title="حذف محصول"
                      onClick={() =>
                        handleDeleteClick(
                          product
                        )
                      }
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </div>


                {/* CONTENT */}

                <div className="admin-product-content">

                  <div className="admin-product-meta">

                    <span>
                      {product.brand}
                    </span>

                    <span>
                      <Star size={13} />
                      {product.rating}
                    </span>

                  </div>


                  <h2>
                    {product.name}
                  </h2>


                  <p>
                    {product.description}
                  </p>


                  <div className="admin-product-footer">

                    <div>

                      <strong>

                        {product.price.toLocaleString(
                          "fa-IR"
                        )}

                        <small>
                          {" "}تومان
                        </small>

                      </strong>


                      {product.oldPrice && (
                        <del>
                          {product.oldPrice.toLocaleString(
                            "fa-IR"
                          )}
                        </del>
                      )}

                    </div>


                    <span>
                      #{product.id}
                    </span>

                  </div>

                </div>

              </article>

            )
          )}

        </div>

      )}


      {/* DELETE MODAL */}

      {deleteTarget && (

        <div
          className="admin-delete-modal-backdrop"
          onClick={closeDeleteModal}
        >

          <div
            className="admin-delete-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              type="button"
              className="admin-delete-modal-close"
              onClick={closeDeleteModal}
              aria-label="بستن"
            >
              <X size={18} />
            </button>


            {/* ICON */}

            <div className="admin-delete-modal-icon">

              <AlertTriangle size={26} />

            </div>


            {/* TEXT */}

            <div className="admin-delete-modal-content">

              <span>
                DELETE PRODUCT
              </span>

              <h2>
                حذف محصول؟
              </h2>

              <p>
                آیا از حذف محصول
                <strong>
                  {" "}
                  «{deleteTarget.name}»
                </strong>
                {" "}
                مطمئن هستید؟
              </p>

              <small>
                این عملیات قابل بازگشت نیست.
              </small>

            </div>


            {/* ACTIONS */}

            <div className="admin-delete-modal-actions">

              <button
                type="button"
                className="admin-delete-cancel"
                onClick={closeDeleteModal}
              >
                انصراف
              </button>


              <button
                type="button"
                className="admin-delete-confirm"
                onClick={confirmDelete}
              >
                <Trash2 size={16} />
                حذف محصول
              </button>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

export default AdminProducts;