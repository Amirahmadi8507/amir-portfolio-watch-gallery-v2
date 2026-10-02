import { useEffect, useState } from "react";
import {
  ArrowRight,
  Plus,
  Trash2,
  Save,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useProducts } from "../../context/useProducts";

function ProductForm() {
  const { id } = useParams();

  const {
    products,
    addProduct,
    updateProduct,
  } = useProducts();

  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    brand: "AM Atelier",
    category: "classic",
    type: "classic",
    price: "",
    oldPrice: "",
    rating: "5",
    reviews: "0",
    badge: "",
    description: "",
    features: [""],
    image: "/projects/portfolio-showcase.png",
  });

  /* =========================
     LOAD PRODUCT FOR EDIT
  ========================= */

  useEffect(() => {
    if (!isEditMode) return;

    const product = products.find(
      (item) => String(item.id) === String(id)
    );

    if (!product) {
      navigate("/admin/products");
      return;
    }

    setForm({
      name: product.name || "",
      brand: product.brand || "AM Atelier",
      category: product.category || "classic",
      type: product.type || "classic",
      price: product.price ?? "",
      oldPrice: product.oldPrice ?? "",
      rating: product.rating ?? "5",
      reviews: product.reviews ?? "0",
      badge: product.badge || "",
      description: product.description || "",
      features:
        product.features?.length
          ? product.features
          : [""],
      image:
        product.image ||
        "/projects/portfolio-showcase.png",
    });
  }, [
    id,
    isEditMode,
    products,
    navigate,
  ]);

  /* =========================
     INPUT CHANGE
  ========================= */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /* =========================
     FEATURE CHANGE
  ========================= */

  const handleFeatureChange = (
    index,
    value
  ) => {
    setForm((current) => {
      const features = [
        ...current.features,
      ];

      features[index] = value;

      return {
        ...current,
        features,
      };
    });
  };

  /* =========================
     ADD FEATURE
  ========================= */

  const addFeature = () => {
    setForm((current) => ({
      ...current,
      features: [
        ...current.features,
        "",
      ],
    }));
  };

  /* =========================
     REMOVE FEATURE
  ========================= */

  const removeFeature = (index) => {
    setForm((current) => {
      const features =
        current.features.filter(
          (_, featureIndex) =>
            featureIndex !== index
        );

      return {
        ...current,
        features:
          features.length > 0
            ? features
            : [""],
      };
    });
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert(
        "لطفاً نام محصول را وارد کنید."
      );
      return;
    }

    if (!form.price) {
      alert(
        "لطفاً قیمت محصول را وارد کنید."
      );
      return;
    }

    const productData = {
      name: form.name.trim(),

      brand:
        form.brand.trim() ||
        "AM Atelier",

      category: form.category,

      type: form.type,

      price: Number(form.price),

      oldPrice:
        form.oldPrice === ""
          ? null
          : Number(form.oldPrice),

      rating: Number(form.rating),

      reviews: Number(form.reviews),

      badge:
        form.badge.trim() || null,

      description:
        form.description.trim(),

      features:
        form.features.filter(
          (feature) =>
            feature.trim() !== ""
        ),

      image: (() => {
  const imagePath = form.image.trim();

  if (!imagePath) {
    return "/projects/portfolio-showcase.png";
  }

  if (imagePath.startsWith("/public/")) {
    return imagePath.replace("/public", "");
  }

  return imagePath;
})(),
    };

    if (isEditMode) {
      updateProduct(
        Number(id),
        productData
      );
    } else {
      addProduct(productData);
    }

    navigate("/admin/products");
  };

  return (
    <section className="admin-product-form-page">

      {/* HEADER */}

      <div className="admin-form-header">

        <div>

          <span className="admin-eyebrow">
            PRODUCT MANAGEMENT
          </span>

          <h1>
            {isEditMode
              ? "ویرایش"
              : "افزودن"}

            <span>
              {" "}
              محصول
            </span>
          </h1>

          <p>
            {isEditMode
              ? "اطلاعات محصول را ویرایش و ذخیره کنید."
              : "اطلاعات محصول جدید را وارد کنید."}
          </p>

        </div>

        <Link
          to="/admin/products"
          className="admin-back-btn"
        >
          <ArrowRight size={17} />

          بازگشت به محصولات
        </Link>

      </div>


      {/* FORM */}

      <form
        className="admin-product-form"
        onSubmit={handleSubmit}
      >

        {/* BASIC INFORMATION */}

        <div className="admin-form-section">

          <div className="admin-form-section-title">

            <h2>
              اطلاعات اصلی
            </h2>

            <span>
              BASIC INFORMATION
            </span>

          </div>


          <div className="admin-form-grid">

            <div className="admin-form-group">

              <label htmlFor="name">
                نام محصول
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="مثلاً Royal Chronograph"
              />

            </div>


            <div className="admin-form-group">

              <label htmlFor="brand">
                برند
              </label>

              <input
                id="brand"
                name="brand"
                type="text"
                value={form.brand}
                onChange={handleChange}
                placeholder="نام برند"
              />

            </div>


            <div className="admin-form-group">

              <label htmlFor="category">
                دسته‌بندی
              </label>

              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="classic">
                  کلاسیک
                </option>

                <option value="luxury">
                  لوکس
                </option>

                <option value="minimal">
                  مینیمال
                </option>

                <option value="sport">
                  اسپرت
                </option>
              </select>

            </div>


            <div className="admin-form-group">

              <label htmlFor="type">
                نوع موتور / مدل
              </label>

              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="classic">
                  Classic
                </option>

                <option value="chronograph">
                  Chronograph
                </option>

                <option value="automatic">
                  Automatic
                </option>

                <option value="sport">
                  Sport
                </option>
              </select>

            </div>

          </div>

        </div>


        {/* PRICE */}

        <div className="admin-form-section">

          <div className="admin-form-section-title">

            <h2>
              قیمت
            </h2>

            <span>
              PRICING
            </span>

          </div>


          <div className="admin-form-grid">

            <div className="admin-form-group">

              <label htmlFor="price">
                قیمت فعلی
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="18500000"
              />

            </div>


            <div className="admin-form-group">

              <label htmlFor="oldPrice">
                قیمت قبلی
              </label>

              <input
                id="oldPrice"
                name="oldPrice"
                type="number"
                min="0"
                value={form.oldPrice}
                onChange={handleChange}
                placeholder="21000000"
              />

            </div>

          </div>

        </div>


        {/* RATING */}

        <div className="admin-form-section">

          <div className="admin-form-section-title">

            <h2>
              امتیاز و وضعیت
            </h2>

            <span>
              RATING & STATUS
            </span>

          </div>


          <div className="admin-form-grid">

            <div className="admin-form-group">

              <label htmlFor="rating">
                امتیاز
              </label>

              <input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
              />

            </div>


            <div className="admin-form-group">

              <label htmlFor="reviews">
                تعداد نظرات
              </label>

              <input
                id="reviews"
                name="reviews"
                type="number"
                min="0"
                value={form.reviews}
                onChange={handleChange}
              />

            </div>


            <div className="admin-form-group">

              <label htmlFor="badge">
                برچسب
              </label>

              <input
                id="badge"
                name="badge"
                type="text"
                value={form.badge}
                onChange={handleChange}
                placeholder="جدید، پرفروش، ویژه..."
              />

            </div>

          </div>

        </div>


        {/* DESCRIPTION */}

        <div className="admin-form-section">

          <div className="admin-form-section-title">

            <h2>
              توضیحات
            </h2>

            <span>
              DESCRIPTION
            </span>

          </div>


          <div className="admin-form-group">

            <label htmlFor="description">
              توضیحات محصول
            </label>

            <textarea
              id="description"
              name="description"
              rows="6"
              value={form.description}
              onChange={handleChange}
              placeholder="توضیحات کامل محصول را بنویسید..."
            />

          </div>

        </div>


        {/* FEATURES */}

        <div className="admin-form-section">

          <div className="admin-form-section-title">

            <div>

              <h2>
                ویژگی‌ها
              </h2>

              <span>
                FEATURES
              </span>

            </div>

            <button
              type="button"
              className="admin-add-feature-btn"
              onClick={addFeature}
            >
              <Plus size={16} />

              افزودن ویژگی
            </button>

          </div>


          <div className="admin-features-list">

            {form.features.map(
              (feature, index) => (

                <div
                  className="admin-feature-row"
                  key={index}
                >

                  <input
                    type="text"
                    value={feature}
                    onChange={(event) =>
                      handleFeatureChange(
                        index,
                        event.target.value
                      )
                    }
                    placeholder={`ویژگی ${index + 1}`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeFeature(index)
                    }
                    title="حذف ویژگی"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              )
            )}

          </div>

        </div>


        {/* IMAGE */}

        <div className="admin-form-section">

          <div className="admin-form-section-title">

            <h2>
              تصویر محصول
            </h2>

            <span>
              PRODUCT IMAGE
            </span>

          </div>


          <div className="admin-form-grid">

            <div className="admin-form-group">

              <label htmlFor="image">
                مسیر تصویر
              </label>

              <input
                id="image"
                name="image"
                type="text"
                value={form.image}
                onChange={handleChange}
                placeholder="/projects/portfolio-showcase.png"
              />

            </div>

          </div>


          <div className="admin-image-preview">
<img
  src={
    form.image?.startsWith("/public/")
      ? form.image.replace("/public", "")
      : form.image
  }
  alt="پیش‌نمایش محصول"
  onError={(event) => {
    console.error("خطا در نمایش تصویر:", form.image);
    event.currentTarget.style.display = "none";
  }}
/>

          </div>

        </div>


        {/* ACTIONS */}

        <div className="admin-form-actions">

          <Link
            to="/admin/products"
            className="admin-cancel-btn"
          >
            انصراف
          </Link>

          <button
            type="submit"
            className="admin-save-product-btn"
          >
            <Save size={18} />

            {isEditMode
              ? "ذخیره تغییرات"
              : "ذخیره محصول"}
          </button>

        </div>

      </form>

    </section>
  );
}

export default ProductForm;