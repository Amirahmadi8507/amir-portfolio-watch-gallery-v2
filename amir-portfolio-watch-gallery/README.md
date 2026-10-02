# AM Portfolio + Watch Gallery (نسخه‌ی سه‌بعدی)

React + Vite + Three.js (React Three Fiber). پورتفولیو، فروشگاه ساعت و پنل مدیریت.

## اجرا

```bash
npm install
npm run dev       # توسعه
npm run build     # ساخت نسخه نهایی
npm run preview
```

## امکانات سه‌بعدی جدید

- **ساعت پروسیجرال با جزئیات کامل** (`components/three/DetailedWatch.jsx`): بزل دندانه‌دار، ایندکس‌ها، تاج، لاگ‌ها، بند، شیشه و عقربه‌هایی که زمان واقعی را نشان می‌دهند. ظاهر هر ساعت از روی `category` محصول (luxury / classic / minimal / sport) تعیین می‌شود (`watchStyles.js`).
- **صحنه‌ی هیرو صفحه‌ی اصلی**: ساعت شناور + حلقه‌های مداری + Sparkles + Bloom، با واکنش به موس.
- **پس‌زمینه‌ی ۳بعدی کل سایت** (`SiteBackground3D.jsx`): میدان ذرات که با اسکرول عمیق‌تر می‌شود.
- **کالبدشکافی ساعت** (`ExplodedWatchSection.jsx`): با اسکرول یا اسلایدر، قطعات ساعت از هم باز می‌شوند.
- **نمایشگر ۳بعدی محصول**: در صفحه‌ی جزئیات محصول (سه‌بعدی/عکس) و در Showcase فروشگاه با چرخش دستی.
- **کارت‌های Tilt**: کارت محصولات و پروژه‌ها با موس در فضا کج می‌شوند (`<GlassCard tilt />`).
- محیط نوری با `Lightformer` ساخته شده و هیچ فایل HDR از اینترنت دانلود نمی‌کند.
- Canvas ها فقط وقتی دیده می‌شوند ساخته می‌شوند (محدودیت WebGL Context) و با `prefers-reduced-motion` پس‌زمینه خاموش می‌شود.

## دیپلوی

`vite.config.js` روی `base: "/amir-portfolio-watch-gallery/"` تنظیم است و workflow گیت‌هاب در `.github/workflows/deploy.yml` وجود دارد.
