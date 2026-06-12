import { GradeChip } from "@/components/common/Grade";
import { useAuth } from "@/providers/AuthProvider";

const MyShopGradeSummary = ({ meta, grades }) => {
  let { user } = useAuth();

  //TODO: 나중에 가능하다면 다른 파일로 분리하기
  const SIZE = {
    MOBILE: "sm",
    TABLET: "md",
    DESKTOP: "lg",
  };

  return (
    <div>
      <div>
        <div>{user?.nickname}님이 보유하신 카드</div>
        <div>{meta?.totalCopyCount}장</div>
      </div>
      <div className="tablet:hidden flex gap-[10px]">
        {grades.map(({ grade, count }) => (
          <GradeChip key={grade} grade={grade} count={count} size={SIZE.MOBILE} />
        ))}
      </div>
      <div className="hidden tablet:flex desktop:hidden gap-[10px]">
        {grades.map(({ grade, count }) => (
          <GradeChip key={grade} grade={grade} count={count} size={SIZE.TABLET} />
        ))}
      </div>
      <div className="hidden desktop:flex  gap-[20px]">
        {grades.map(({ grade, count }) => (
          <GradeChip key={grade} grade={grade} count={count} size={SIZE.DESKTOP} />
        ))}
      </div>
    </div>
  );
};

export default MyShopGradeSummary;
