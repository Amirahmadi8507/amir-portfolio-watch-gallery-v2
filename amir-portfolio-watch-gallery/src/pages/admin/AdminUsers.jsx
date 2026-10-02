import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import GlassCard from "../../components/common/GlassCard";

function AdminUsers() {
  const savedAccount =
    localStorage.getItem("am-account");

  const account = savedAccount
    ? JSON.parse(savedAccount)
    : null;

  return (
    <section className="admin-users-page">

      <div className="admin-products-top">

        <div>
          <span className="admin-eyebrow">
            USER MANAGEMENT
          </span>

          <h1>
            مدیریت
            <span> کاربران</span>
          </h1>

          <p>
            اطلاعات حساب‌های ثبت‌شده در فروشگاه.
          </p>
        </div>

      </div>


      {!account ? (

        <GlassCard className="admin-orders-empty">

          <User size={38} />

          <h3>
            هنوز کاربری ثبت نشده
          </h3>

          <p>
            بعد از ثبت‌نام کاربر، اطلاعات او اینجا نمایش داده می‌شود.
          </p>

        </GlassCard>

      ) : (

        <GlassCard className="admin-user-card">

          <div className="admin-user-avatar">
            <User size={28} />
          </div>


          <div className="admin-user-main">

            <div>
              <span>
                نام کاربر
              </span>

              <strong>
                {account.name || "بدون نام"}
              </strong>
            </div>


            <div>
              <Mail size={17} />

              <span>
                {account.email}
              </span>
            </div>


            <div>
              <Phone size={17} />

              <span>
                {account.phone || "ثبت نشده"}
              </span>
            </div>


            <div>
              <MapPin size={17} />

              <span>
                {account.city || "ثبت نشده"}
              </span>
            </div>

          </div>


          <div className="admin-user-status">

            <ShieldCheck size={17} />

            حساب فعال

          </div>

        </GlassCard>

      )}

    </section>
  );
}

export default AdminUsers;