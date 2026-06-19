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
      bg-main
      text-black
    `,

    secondary: `
      border border-gray-100
      bg-transparent
      text-white
    `,

    ghost: `
      bg-transparent
      text-white
    `,
  };

  const sizes = {
    xs: `
      h-[40px]
      w-[72.5px]
      text-[12px]
    `,

    sm: `
      h-[60px]
      w-[170px]
      text-[18px]
    `,

    md: `
      h-[60px]
      w-[342px]
      text-[18px]
    `,

    lg: `
      h-[60px]
      w-[440px]
      text-[20px]
    `,

    full: `
      h-[55px]
      w-full
      text-[16px]
    `,

    landing: `
    h-[40px]
    w-[150px]
    text-[12px]

    tablet:h-[55px]
    tablet:w-[226px]
    tablet:text-[16px]
  `,

    create: `
      h-[55px]
      w-[345px]
      text-[16px]

      tablet:h-[60px]
      tablet:w-[440px]
`,
    point: `  
      h-[60px]
      w-[520px]
      text-[16px]`,

    exchange: `
        h-[60px]
        w-[210px]
        text-[18px]`,

    sale: `
        h-[55px]
        w-[165px]
        text-[16px]`,
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
        disabled:bg-gray-400
        disabled:text-gray-300

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
