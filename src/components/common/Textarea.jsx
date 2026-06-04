const SIZE_CLASSES = {
  lg: "h-[180px] w-[520px]",
  md: "h-[140px] w-[440px]",
  sm: "h-[140px] w-[345px]",
};

const LABEL_SIZE_CLASSES = {
  md: "text-[16px]",
  lg: "text-[20px]",
};

export default function Textarea({
  label,
  error,
  size = "md",
  labelSize = "md",
  className = "",
  textareaClassName = "",
  ...props
}) {
  return (
    <label className={`flex flex-col gap-[10px] ${className}`}>
      {label && (
        <span className={`font-bold text-white ${LABEL_SIZE_CLASSES[labelSize]}`}>{label}</span>
      )}

      <textarea
        className={`
          resize-none
          rounded-[2px]
          border
          bg-black
          px-5
          py-[18px]
          text-[14px]
          text-white
          outline-none
          placeholder:text-gray-300
          ${SIZE_CLASSES[size]}
          ${error ? "border-red" : "border-gray-200"}
          ${textareaClassName}
        `}
        {...props}
      />

      {error && <p className="text-[12px] text-red">{error}</p>}
    </label>
  );
}
