import { GradeChip } from "@/components/common/Grade";
import { useAuth } from "@/providers/AuthProvider";

const MyShopGradeSummary = ({ meta = {} }) => {
  const { user } = useAuth();

  const SIZE = {
    MOBILE: "sm",
    TABLET: "md",
    DESKTOP: "lg",
  };

  const grades = meta.gradeStats ?? [];

  return (
    <div className="flex flex-col gap-[15px] tablet:gap-[20px]">
      <div className="flex items-center gap-[5px] whitespace-nowrap">
        <div className="text-[14px] font-bold leading-none desktop:text-[24px]">
          {user?.nickname || "user"}님이 보유한 카드
        </div>

        <div className="text-[12px] font-normal leading-none text-gray-300 desktop:text-[20px]">
          ({meta.totalCount || "0"}장)
        </div>
      </div>

      <div className="flex gap-[10px] overflow-x-auto tablet:hidden">
        {grades.map(({ grade, count }) => (
          <div key={grade} className="shrink-0 whitespace-nowrap">
            <GradeChip grade={grade} count={count} size={SIZE.MOBILE} />
          </div>
        ))}
      </div>

      <div className="hidden gap-[10px] tablet:flex desktop:hidden">
        {grades.map(({ grade, count }) => (
          <div key={grade} className="shrink-0 whitespace-nowrap">
            <GradeChip grade={grade} count={count} size={SIZE.TABLET} />
          </div>
        ))}
      </div>

      <div className="hidden gap-[20px] desktop:flex">
        {grades.map(({ grade, count }) => (
          <div key={grade} className="shrink-0 whitespace-nowrap">
            <GradeChip grade={grade} count={count} size={SIZE.DESKTOP} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyShopGradeSummary;
