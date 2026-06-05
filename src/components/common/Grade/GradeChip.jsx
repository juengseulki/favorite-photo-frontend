const GRADE_STYLE = {
  COMMON: "border-main text-main",
  RARE: "border-blue text-blue",
  SUPER_RARE: "border-purple text-purple",
  LEGENDARY: "border-pink text-pink",
};

const GRADE_SIZE = {
  sm: `
    h-[30px]
    px-[10px]
    text-[12px]
  `,

  md: `
    h-8
    px-[10px]
    text-[14px]
  `,

  lg: `
    h-10
    px-5
    text-[16px]
  `,
};

function GradeChip({ grade, count, size = "md", active = false, onClick }) {
  if (!grade) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center justify-center
        gap-2

        border
        bg-black

        ${GRADE_STYLE[grade]}
        ${GRADE_SIZE[size]}

        ${active ? "brightness-125" : ""}
      `}
    >
      <span>{grade.replace("_", " ")}</span>

      {count !== undefined && <span>{count}장</span>}
    </button>
  );
}

export default GradeChip;
