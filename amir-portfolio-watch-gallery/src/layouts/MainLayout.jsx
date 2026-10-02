import {
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";

import { ArrowUpLeft } from "lucide-react";

import ShopHeader from "../components/shop/ShopHeader";
import FloatingNav from "../components/navigation/FloatingNav";
import SiteBackground3D from "../components/three/SiteBackground3D";

import { useSiteSettings } from "../context/useSiteSettings";

function MainLayout() {
  const location = useLocation();

  const { settings } = useSiteSettings();

  return (
    <div className="app-shell">

      {/* 3D Background */}

      <SiteBackground3D />


      {/* Floating Navigation */}

      <FloatingNav />


      {/* Shop Header */}

      {location.pathname.startsWith("/shop") && (
        <ShopHeader />
      )}


      {/* Main Content */}

      <main>
        <Outlet />
      </main>


      {/* Footer */}

      <footer className="site-footer">

        <div className="site-footer-inner">


          {/* Brand */}

          <div className="site-footer-brand">

            <div className="footer-logo">

              <span className="brand-dot"></span>

              <span>
                {settings.siteName || "AM"}
              </span>

            </div>


            <p>
              {settings.description ||
                "طراحی و توسعه تجربه‌های دیجیتال مدرن، تعاملی و متفاوت."}
            </p>

          </div>


          {/* Links */}

          <div className="site-footer-links">

            <span>
              EXPLORE
            </span>


            <Link to="/">
              خانه
            </Link>


            <Link to="/portfolio">
              پورتفولیو
            </Link>


            <Link to="/shop">
              Watch Gallery
            </Link>


            <Link to="/contact">
              تماس
            </Link>

          </div>


          {/* CTA */}

          <div className="site-footer-cta">

            <span>
              LET'S CREATE
            </span>


            <h3>
              یک تجربه
              <strong>
                {" "}متفاوت بسازیم.
              </strong>
            </h3>


            <Link to="/contact">

              شروع همکاری

              <ArrowUpLeft size={17} />

            </Link>

          </div>

        </div>


        {/* Footer Bottom */}

        <div className="site-footer-bottom">

          <span>
            © 2026 {settings.siteName || "AM"} — تمامی حقوق محفوظ است.
          </span>


          <span>
            Designed & Developed with React
          </span>

        </div>

      </footer>

    </div>
  );
}

export default MainLayout;