import Image from "next/image";
import Link from "next/link";

import Button from "@/components/common/Button";
import { LANDING_IMAGES } from "../constants/landingImages";

export default function CTASection() {
  return (
    <section
      className="
        relative
        bg-black

        h-[421px]
        tablet:h-[620px]
        desktop:h-[597px]
      "
    >
      <div
        className="
          relative
          mx-auto
          flex
          h-full
          max-w-[1920px]

          flex-col
          items-center
          justify-center
        "
      >
        {/* 카드 */}
        <Image
          src={LANDING_IMAGES.CTA.PC}
          alt=""
          width={103.695}
          height={150.934}
          className="
            hidden
            desktop:block

            mb-[27.32px]
            top-[114px]
            left-[881.47px]
          "
        />

        <Image
          src={LANDING_IMAGES.CTA.TABLET}
          alt=""
          width={103.695}
          height={150.934}
          className="
            hidden
            tablet:block
            desktop:hidden

            mb-[27.32px]
            top-[108px]
            left-[296.17px]
          "
        />

        <Image
          src={LANDING_IMAGES.CTA.MOBILE}
          alt=""
          width={78.35}
          height={114.043}
          className="
            tablet:hidden

            mb-[23px]
            top-[60px]
            left-[123.98px]
          "
        />

        <h2
          className="
            text-center
            font-bold
            text-white

            text-[18px]
            leading-[28px]

            tablet:text-[22px]
            tablet:leading-[32px]

            desktop:text-[28px]
            desktop:leading-[40px]
          "
        >
          나의 최애를 지금 찾아보세요!
        </h2>

        <Link href="/market" className="mt-[27.39px]">
          <Button size="landing">최애 찾으러 가기</Button>
        </Link>
      </div>
    </section>
  );
}
