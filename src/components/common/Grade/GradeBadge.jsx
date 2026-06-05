const GRADE_TEXT_CLASSES = {
  COMMON: "text-main",
  RARE: "text-blue",
  SUPER_RARE: "text-purple",
  LEGENDARY: "text-pink",
};

const GRADE_TEXT_SIZE = {
  xs: "text-[10px]",
  sm: "text-[12px]",
  md: "text-[14px]",
  lg: "text-[16px]",
};

function normalizeGrade(grade) {
  return grade?.replace(" ", "_");
}

export default function GradeBadge({ grade, size = "md" }) {
  if (!grade) return null;

  const normalizedGrade = normalizeGrade(grade);

  return (
    <span className={`font-bold ${GRADE_TEXT_SIZE[size]} ${GRADE_TEXT_CLASSES[normalizedGrade]}`}>
      {normalizedGrade.replace("_", " ")}
    </span>
  );
}
