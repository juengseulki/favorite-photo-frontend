import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import PointModal from "@/features/point/components/randomBoxModal";

export default function MobileMenu({
  user,
  isOpen,
  onClose,
  onLogout,
  isModalOpen,
  setIsModalOpen,
}) {
  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label="메뉴 닫기"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/70 tablet:hidden"
      />

      <aside className="fixed left-0 top-[60px] z-50 flex h-[calc(100vh-60px)] w-[250px] flex-col bg-gray-500 px-5 py-6 tablet:hidden">
        {user ? (
          <>
            <div className="pb-5">
              <p className="font-brand text-[18px] text-white">안녕하세요, {user.nickname}님!</p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-[12px] text-gray-300">보유 포인트</span>
                <span className="text-[12px] font-bold text-main">
                  {(user.point ?? 0).toLocaleString()} P
                </span>
              </div>
            </div>

            <nav className="border-t border-gray-400 pt-5">
              <div className="flex flex-col gap-4 font-brand text-[14px] text-white">
                <Link href={ROUTES.MARKET} onClick={onClose}>
                  마켓플레이스
                </Link>

                <Link href={ROUTES.MY_GALLERY} onClick={onClose}>
                  마이갤러리
                </Link>

                <Link href={ROUTES.MY_SHOP} onClick={onClose}>
                  판매 중인 포토카드
                </Link>
                <button onClick={() => setIsModalOpen(true)} className="text-left">
                  랜덤 포인트
                </button>
              </div>
            </nav>

            <button
              type="button"
              onClick={onLogout}
              className="mt-auto text-left text-[12px] text-gray-400"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <nav className="border-t border-gray-400 pt-5">
              <div className="flex flex-col gap-4 font-brand text-[14px] text-white">
                <Link href={ROUTES.MARKET} onClick={onClose}>
                  마켓플레이스
                </Link>
              </div>
            </nav>

            <Link
              href={ROUTES.SIGNUP}
              onClick={onClose}
              className="mt-auto text-[12px] text-gray-400"
            >
              회원가입
            </Link>
          </>
        )}
      </aside>
      <PointModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isModalOpen
        setIsModalOpen
      />
    </>
  );
}
