const SIZE_CLASSES = {
  lg: "h-[180px] w-[520px]",
  md: "h-[140px] w-[440px]",
  sm: "h-[140px] w-[345px]",
};

export default function Textarea({
  label,
  error,
  size = "md",
  className = "",
  textareaClassName = "",
  ...props
}) {
  return (
    <label className={`flex flex-col gap-[10px] ${className}`}>
      {label && <span className="text-[14px] font-bold text-white">{label}</span>}

      <textarea
        className={`
          resize-none
          rounded-[2px]
          border
          bg-[#0F0F0F]
          px-5
          py-[18px]
          text-[14px]
          text-white
          outline-none
          placeholder:text-[#777777]
          ${SIZE_CLASSES[size]}
          ${error ? "border-red-500" : "border-[#DDDDDD]"}
          ${textareaClassName}
        `}
        {...props}
      />

      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </label>
  );
}
