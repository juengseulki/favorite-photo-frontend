import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

export default function HomePage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-128px)] max-w-6xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-sm font-semibold text-gray-500">Favorite Photo Card Platform</p>

      <h1 className="mb-6 text-5xl font-bold tracking-tight">최애의 포토</h1>

      <p className="mb-8 max-w-xl text-lg leading-8 text-gray-600">
        나만의 포토카드를 만들고, 판매하고, 교환할 수 있는 포토카드 거래 플랫폼입니다.
      </p>

      <div className="flex gap-3">
        <Link
          href={ROUTES.MARKET}
          className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white"
        >
          마켓 둘러보기
        </Link>

        <Link
          href={ROUTES.MY_GALLERY}
          className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800"
        >
          내 갤러리 보기
        </Link>
      </div>
    </section>
  );
}
