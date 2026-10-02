function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`ui-button ui-button-${variant} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;