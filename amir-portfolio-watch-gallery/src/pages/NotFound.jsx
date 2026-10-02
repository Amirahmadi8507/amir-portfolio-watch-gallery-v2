import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found-page">

      <span>
        ERROR 404
      </span>

      <h1>
        این صفحه پیدا نشد.
      </h1>

      <p>
        شاید این صفحه جابه‌جا شده یا آدرس اشتباه وارد شده است.
      </p>

      <Link to="/">
        بازگشت به خانه
      </Link>

    </section>
  );
}

export default NotFound;