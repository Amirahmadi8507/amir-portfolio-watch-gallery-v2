import {
  Mail,
  MapPin,
  Send,
} from "lucide-react";

import GlassCard from "../../components/common/GlassCard";

function ContactShop() {
  return (
    <section className="shop-contact-page">

      <div className="shop-contact-header">
        <span>
          CONTACT AM
        </span>

        <h1>
          با ما در ارتباط باشید.
        </h1>

        <p>
          برای سوال درباره محصولات، سفارش یا همکاری،
          پیام خود را برای ما ارسال کنید.
        </p>
      </div>

      <div className="shop-contact-grid">

        <GlassCard className="shop-contact-info">

          <div>
            <Mail size={20} />

            <span>
              ایمیل
            </span>

            <strong>
              your@email.com
            </strong>
          </div>

          <div>
            <MapPin size={20} />

            <span>
              موقعیت
            </span>

            <strong>
              ایران
            </strong>
          </div>

        </GlassCard>

        <GlassCard>

          <form
  className="shop-contact-form"
  onSubmit={(event) => event.preventDefault()}
>

            <label>
              نام
              <input
                type="text"
                placeholder="نام شما"
              />
            </label>

            <label>
              ایمیل
              <input
                type="email"
                placeholder="example@email.com"
              />
            </label>

            <label>
              پیام
              <textarea
                rows="6"
                placeholder="پیام خود را بنویسید..."
              />
            </label>

            <button type="submit">
              ارسال پیام
              <Send size={17} />
            </button>

          </form>

        </GlassCard>

      </div>

    </section>
  );
}

export default ContactShop;