export default function PrimaryButton({ children, type = "button", className = "", ...props }) {
  return (
    <button
      type={type}
      className={`
        flex h-[60px] w-[440px] shrink-0 items-center justify-center gap-[10px]
        bg-[#FFFF04]
        text-[20px] font-bold text-[#0F0F0F]
        transition hover:brightness-95 active:brightness-90
        disabled:cursor-not-allowed disabled:bg-[#5A5A5A] disabled:text-[#A4A4A4]
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
