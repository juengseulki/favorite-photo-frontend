import Button from "@/components/common/Button";
import Link from "next/link";

export const metadata = {
  title: "404 – 최애의 포토",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center gap-[16px] px-4 text-center tablet:min-h-[calc(100vh-80px)]">
      <p className="font-brand text-[100px] font-bold leading-none text-main tablet:text-[160px] desktop:text-[200px]">
        404
      </p>

      <h1 className="text-[22px] font-bold text-white tablet:text-[32px]">
        페이지를 찾을 수 없습니다
      </h1>

      <p className="max-w-[320px] text-[13px] leading-[1.7] text-gray-300 tablet:max-w-none tablet:text-[15px]">
        삭제되었거나 존재하지 않는 포토카드입니다.
        <br />
        주소를 다시 확인하거나 마켓플레이스로 돌아가 보세요.
      </p>

      <div className="mt-[8px] flex flex-col items-center gap-[12px] tablet:flex-row">
        <Button variant="primary" className="!h-[56px] !w-[220px] !p-0 !text-[16px]">
          <Link href="/market" className="flex h-full w-full items-center justify-center">
            마켓플레이스 가기
          </Link>
        </Button>
        <Button variant="secondary" className="!h-[56px] !w-[220px] !p-0 !text-[16px]">
          <Link href="/" className="flex h-full w-full items-center justify-center">
            홈으로 가기
          </Link>
        </Button>
      </div>
    </div>
  );
}
