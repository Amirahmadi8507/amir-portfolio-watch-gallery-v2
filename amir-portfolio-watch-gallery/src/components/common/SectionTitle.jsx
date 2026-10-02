function SectionTitle({
  eyebrow,
  title,
  description,
  align = "right",
}) {
  return (
    <div className={`section-title section-title-${align}`}>
      {eyebrow && (
        <span className="section-title-eyebrow">
          {eyebrow}
        </span>
      )}

      <h2>{title}</h2>

      {description && (
        <p>{description}</p>
      )}
    </div>
  );
}

export default SectionTitle;