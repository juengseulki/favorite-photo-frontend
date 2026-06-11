import Image from "next/image";
import { LANDING_IMAGES } from "../constants/landingImages";

export default function RandomBoxSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-black

        h-[390px]
        tablet:h-[667px]
        desktop:h-[900px]
      "
    >
      <div className="relative mx-auto h-full w-full max-w-[1920px] overflow-hidden">
        {/* 그라데이션 배경 */}
        <div
          className="
            absolute
            z-0

            left-0
            bottom-0

            w-full

            h-[300px]
            tablet:h-[520px]
            desktop:h-[594px]

            bg-[linear-gradient(180deg,#0F0F0F_26.01%,#262900_100%)]
        "
        />

        {/* 텍스트 */}
        <div
          className="
            absolute z-20

            left-[32px] top-[67px]

            tablet:left-[61px] tablet:top-[110px]

            desktop:left-[428px] desktop:top-[133px]
          "
        >
          <h2
            className="
              text-[20px] font-bold leading-[32px] text-white

              tablet:text-[28px] tablet:leading-[38px]

              desktop:text-[36px] desktop:leading-[46px]
            "
          >
            랜덤 상자로 <span className="text-main">포인트 받자!</span> 🎉
          </h2>

          <p
            className="
              mt-[12px]
              text-[14px] leading-[22px] text-gray-200

              tablet:mt-[16px]
              tablet:text-[18px] tablet:leading-[28px]
            "
          >
            한 시간마다 주어지는 랜덤 상자를 열고,
            <br />
            포인트를 획득하세요
          </p>
        </div>

        {/* 왼쪽 블루 박스 */}
        <Image
          src={LANDING_IMAGES.RANDOM_BOX.BLUE_PC}
          alt=""
          width={685.63}
          height={530.964}
          className="
            absolute z-[5] hidden desktop:block
            left-[26px] bottom-0
        "
        />

        <Image
          src={LANDING_IMAGES.RANDOM_BOX.BLUE_TABLET}
          alt=""
          width={352.69}
          height={273.129}
          className="
            absolute z-[5] hidden tablet:block desktop:hidden
            left-0 bottom-0
        "
        />

        <Image
          src={LANDING_IMAGES.RANDOM_BOX.BLUE_MOBILE}
          alt=""
          width={209.113}
          height={161.941}
          className="
            absolute z-[5] tablet:hidden
            left-0 bottom-0
        "
        />

        {/* 오른쪽 핑크 박스 */}
        <Image
          src={LANDING_IMAGES.RANDOM_BOX.PINK_PC}
          alt=""
          width={279.142}
          height={216.161}
          className="
            absolute z-[5] hidden desktop:block
            right-[277.6px] bottom-[260.55px]
        "
        />

        <Image
          src={LANDING_IMAGES.RANDOM_BOX.PINK_TABLET}
          alt=""
          width={128.245}
          height={99.309}
          className="
            absolute z-[5] hidden tablet:block desktop:hidden
            right-[-22.14px] bottom-[187.88px]
        "
        />

        <Image
          src={LANDING_IMAGES.RANDOM_BOX.PINK_MOBILE}
          alt=""
          width={68.991}
          height={53.425}
          className="
            absolute z-[5] tablet:hidden
            right-[-6.42px] bottom-[132px]
        "
        />
        {/* 이미지 */}
        <Image
          src={LANDING_IMAGES.RANDOM_BOX.PC}
          alt=""
          width={888.889}
          height={570}
          className="
            absolute z-10 hidden desktop:block

            right-[515.56px]
            bottom-[57px]
          "
        />

        <Image
          src={LANDING_IMAGES.RANDOM_BOX.TABLET}
          alt=""
          width={557}
          height={357}
          className="
            absolute z-10 hidden tablet:block desktop:hidden

            right-[93px]
            bottom-[53px]
          "
        />

        <Image
          src={LANDING_IMAGES.RANDOM_BOX.MOBILE}
          alt=""
          width={308}
          height={198}
          className="
            absolute z-10 tablet:hidden

            right-[29px]
            bottom-[26px]
          "
        />
      </div>
    </section>
  );
}
