import { useAuth } from "@/providers/AuthProvider";
import { GradeChip } from "@/components/common/Grade";

export default function GallerySummary({ meta, grades }) {
  const { user } = useAuth();

  return (
    <div className="mt-10 flex flex-col gap-[20px] border-b border-gray-400 pb-3 desktop:pb-10">
      <p className="flex items-center gap-[10px]">
        <span className="text-[14px] font-bold leading-none desktop:text-[24px]">
          {user ? `${user.nickname}님이 보유한 포토카드` : ""}
        </span>

        <span className="text-[12px] font-normal leading-none text-gray-300 desktop:text-[20px]">
          ({meta.totalCopyCount ?? 0}장)
        </span>
      </p>

      <div className="overflow-x-auto">
        <div className="flex w-max gap-[10px]">
          {grades.map(({ grade, count }) => (
            <GradeChip key={grade} grade={grade} count={count} />
          ))}
        </div>
      </div>
    </div>
  );
}
