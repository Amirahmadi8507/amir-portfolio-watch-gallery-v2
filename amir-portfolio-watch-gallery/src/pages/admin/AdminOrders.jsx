import { useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  Eye,
  CheckCircle2,
  Clock3,
  Filter,
} from "lucide-react";

import { Link } from "react-router-dom";
import GlassCard from "../../components/common/GlassCard";

function AdminOrders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const orders = JSON.parse(
    localStorage.getItem("am-orders") || "[]"
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {

      const searchValue =
        search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        String(order.id)
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        status === "all" ||
        order.statusType === status;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, status]);

  return (
    <section className="admin-orders-page">

      <div className="admin-products-top">

        <div>
          <span className="admin-eyebrow">
            ORDER MANAGEMENT
          </span>

          <h1>
            مدیریت
            <span> سفارش‌ها</span>
          </h1>

          <p>
            سفارش‌های ثبت‌شده فروشگاه را مدیریت کن.
          </p>
        </div>

      </div>


      <div className="admin-products-toolbar">

        <div className="admin-product-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="جستجوی شماره سفارش..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>


        <div className="admin-product-filter">

          <Filter size={17} />

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >

            <option value="all">
              همه سفارش‌ها
            </option>

            <option value="pending">
              در حال پردازش
            </option>

            <option value="success">
              تکمیل شده
            </option>

          </select>

        </div>

      </div>


      <div className="admin-products-summary">

        <div>
          <ShoppingBag size={19} />

          <span>
            کل سفارش‌ها
          </span>

          <strong>
            {orders.length}
          </strong>
        </div>


        <div>
          <Eye size={19} />

          <span>
            نمایش نتایج
          </span>

          <strong>
            {filteredOrders.length}
          </strong>
        </div>

      </div>


      {filteredOrders.length === 0 ? (

        <GlassCard className="admin-orders-empty">

          <ShoppingBag size={38} />

          <h3>
            سفارشی پیدا نشد
          </h3>

          <p>
            هنوز سفارشی با این مشخصات وجود ندارد.
          </p>

        </GlassCard>

      ) : (

        <div className="admin-orders-table">

          {filteredOrders.map((order) => (

            <GlassCard
              className="admin-order-management-card"
              key={order.id}
            >

              <div>

                <span>
                  شماره سفارش
                </span>

                <strong>
                  {order.id}
                </strong>

              </div>


              <div>

                <span>
                  تاریخ
                </span>

                <strong>
                  {order.date}
                </strong>

              </div>


              <div>

                <span>
                  محصولات
                </span>

                <strong>
                  {order.itemsCount}
                </strong>

              </div>


              <div>

                <span>
                  مبلغ
                </span>

                <strong>
                  {Number(order.total || 0)
                    .toLocaleString("fa-IR")}
                  {" "}تومان
                </strong>

              </div>


              <div
                className={`admin-order-status ${
                  order.statusType || ""
                }`}
              >

                {order.statusType === "success" ? (
                  <CheckCircle2 size={15} />
                ) : (
                  <Clock3 size={15} />
                )}

                {order.status}

              </div>


              <Link
                to={`/shop/orders/${order.id}`}
                className="admin-order-view"
              >
                <Eye size={15} />
                مشاهده
              </Link>

            </GlassCard>

          ))}

        </div>

      )}

    </section>
  );
}

export default AdminOrders;