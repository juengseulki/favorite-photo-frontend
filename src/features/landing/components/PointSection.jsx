import Image from "next/image";

import { LANDING_IMAGES } from "../constants/landingImages";

export default function PointSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-black

        mt-[80px]
        tablet:mt-[110px]
        desktop:mt-[138px]

        h-[440px]
        tablet:h-[707px]
        desktop:h-[800px]
      "
    >
      <div
        className="
          relative
          mx-auto
          h-full
          w-full
          max-w-[1920px]
          overflow-hidden
        "
      >
        {/* 텍스트 */}
        <div
          className="
            absolute
            z-20

            left-[32px]
            top-[67px]

            tablet:left-[61px]
            tablet:top-[100px]

            desktop:left-[428px]
            desktop:top-[138px]
        "
        >
          <h2
            className="
            font-bold
            text-white

            text-[20px]
            leading-[32px]

            tablet:text-[36px]
            tablet:leading-[42px]

            desktop:text-[36px]
            desktop:leading-[46px]
            "
          >
            포인트로 <span className="text-main">안전하게 거래</span>하세요
          </h2>

          <p
            className="
                mt-[12px]

                text-[14px]
                leading-[22px]

                tablet:mt-[16px]
                tablet:text-[18px]
                tablet:leading-[28px]

                text-gray-200
                "
          >
            내 포토카드를 포인트로 팔고, 원하는 포토카드를
            <br />
            포인트로 안전하게 교환하세요
          </p>
        </div>

        {/* 초록 원 */}
        <div
          className="
            absolute
            z-0

            rounded-full
            border-2
            border-main
            opacity-20
            bg-[linear-gradient(180deg,#EFFF04_0%,#0F0F0F_48.81%)]
            shadow-[inset_0_0_50px_0_rgba(255,255,255,0.10)]

            h-[279px]
            w-[279px]
            left-[131px]
            top-[319px]

            tablet:h-[593px]
            tablet:w-[593px]
            tablet:left-[193px]
            tablet:top-[459px]

            desktop:h-[1480px]
            desktop:w-[1480px]
            desktop:left-[501px]
            desktop:top-[438px]
        "
        />

        {/* 이미지 */}
        <Image
          src={LANDING_IMAGES.POINT.PC}
          width={1068}
          height={518}
          alt=""
          className="
            absolute
            z-10

            desktop:w-[1068px]
            desktop:h-auto

            desktop:right-[424px]
            desktop:bottom-[35px]

            hidden
            desktop:block
          "
        />

        <Image
          src={LANDING_IMAGES.POINT.TABLET}
          width={620}
          height={384}
          alt=""
          className="
            absolute
            z-10

            tablet:w-[620px]
            tablet:bottom-[90px]
            tablet:right-[63px]

            hidden
            tablet:block
            desktop:hidden
          "
        />

        <Image
          src={LANDING_IMAGES.POINT.MOBILE}
          width={343}
          height={231}
          alt=""
          className="
            absolute
            z-10

            mobile:w-[343px]
            mobile:bottom-[54px]
            mobile:right-[0px]

            tablet:hidden
          "
        />
      </div>
    </section>
  );
}
