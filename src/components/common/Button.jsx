export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...props
}) {
  const variants = {
    primary: `
      bg-[#EFFf04]
      text-black
    `,

    secondary: `
      border border-[#EEEEEE]
      bg-transparent
      text-white
    `,

    ghost: `
      bg-transparent
      text-white
    `,
  };

  const sizes = {
    sm: `
      h-[60px]
      w-[170px]
      text-[18px]
    `,

    md: `
      h-[75px]
      w-[342px]
      text-[18px]
    `,

    lg: `
      h-[80px]
      w-[440px]
      text-[20px]
    `,

    full: `
      h-[55px]
      w-full
      text-[16px]
    `,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        flex items-center justify-center
        gap-[10px]

        rounded-[2px]

        font-bold

        transition
        hover:brightness-90

        disabled:cursor-not-allowed
        disabled:bg-[#5A5A5A]
        disabled:text-[#A4A4A4]

        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
