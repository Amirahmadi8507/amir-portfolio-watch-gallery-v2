import { Link } from "react-router-dom";
import {
  ArrowUpLeft,
  Watch,
  Crown,
  CircleDot,
  Zap,
} from "lucide-react";

const categories = [
  {
    id: "classic",
    title: "کلاسیک",
    english: "CLASSIC",
    description: "طراحی‌های ماندگار و ظریف برای استایل‌های رسمی.",
    icon: Watch,
  },
  {
    id: "luxury",
    title: "لوکس",
    english: "LUXURY",
    description: "مدل‌های خاص با جزئیات لوکس و ظاهری قدرتمند.",
    icon: Crown,
  },
  {
    id: "minimal",
    title: "مینیمال",
    english: "MINIMAL",
    description: "سادگی، ظرافت و طراحی تمیز در یک مجموعه.",
    icon: CircleDot,
  },
  {
    id: "sport",
    title: "اسپرت",
    english: "SPORT",
    description: "ساعت‌های مدرن برای استفاده روزمره و پرتحرک.",
    icon: Zap,
  },
];

function Categories() {
  return (
    <section className="categories-page">

      <div className="categories-header">
        <span>
          EXPLORE COLLECTIONS
        </span>

        <h1>
          دسته‌بندی ساعت‌ها
        </h1>

        <p>
          مجموعه موردنظر خود را انتخاب کنید و وارد دنیای ساعت‌های AM شوید.
        </p>
      </div>

      <div className="categories-grid">

        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.id}
              to={`/shop/category/${category.id}`}
              className="category-card"
            >
              <div className="category-card-icon">
                <Icon size={25} />
              </div>

              <span>
                {category.english}
              </span>

              <h2>
                {category.title}
              </h2>

              <p>
                {category.description}
              </p>

              <div className="category-card-arrow">
                <ArrowUpLeft size={19} />
              </div>
            </Link>
          );
        })}

      </div>

    </section>
  );
}

export default Categories;