import Image from "next/image";
import Link from "next/link";

import Button from "@/components/common/Button";
import { ROUTES } from "@/lib/constants/routes";
import { FLOW_IMAGES, LANDING_IMAGES } from "../constants/landingImages";

export default function HeroSection() {
  return (
    <section className="bg-black px-4 pt-5 tablet:px-0">
      <div
        className="
          relative
          mx-auto
          overflow-hidden

          aspect-[343/412]
          w-full
          max-w-[343px]

          tablet:aspect-[679/722]
          tablet:max-w-[679px]

          desktop:aspect-[1798/1088]
          desktop:max-w-[1798px]
        "
      >
        <Image
          src={LANDING_IMAGES.HERO.PC_BG}
          alt=""
          fill
          priority
          className="hidden object-cover desktop:block"
        />

        <Image
          src={LANDING_IMAGES.HERO.TABLET_BG}
          alt=""
          fill
          priority
          className="hidden object-cover tablet:block desktop:hidden"
        />

        <Image
          src={LANDING_IMAGES.HERO.MOBILE_BG}
          alt=""
          fill
          priority
          className="object-cover tablet:hidden"
        />

        <div
          className="
            relative
            z-30
            flex
            flex-col
            items-center

            pt-[30px]
            tablet:pt-[57px]
            desktop:pt-[77px]
          "
        >
          <Image
            src={LANDING_IMAGES.LOGO}
            alt="최애의 포토"
            width={139}
            height={25}
            priority
            className="
              hidden
              h-auto

              tablet:block
              tablet:w-[139px]
            "
          />

          <h1
            className="
              mt-[20px]
              text-center

              text-[20px]
              font-bold
              leading-[28px]
              text-white

              tablet:mt-[49px]
              tablet:text-[40px]
              tablet:leading-[52px]

              desktop:mt-[40px]
              desktop:text-[40px]
              desktop:leading-[52px]
            "
          >
            구하기 어려웠던
            <br />
            <span className="text-main">나의 최애</span>가 여기에!
          </h1>

          <Link href={ROUTES.MARKET} className="mt-[16px] tablet:mt-[34px] desktop:mt-[28px]">
            <Button size="landing">최애 찾으러 가기</Button>
          </Link>
        </div>

        <div
          className="
            absolute
            left-0
            z-10
            w-full
            overflow-hidden

            top-[220px]
            tablet:top-[420px]
            desktop:top-[540px]
          "
        >
          <div className="flex animate-flow gap-[24px] tablet:gap-[36px] desktop:gap-[48px]">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((group) => (
              <div
                key={group}
                className="
                  flex
                  shrink-0
                  gap-[16px]
                  tablet:gap-[24px]
                  desktop:gap-[32px]
                "
              >
                {FLOW_IMAGES.map((src) => (
                  <Image
                    key={`${src}-${group}`}
                    src={src}
                    alt=""
                    width={150}
                    height={220}
                    className="
                      h-[114px]
                      w-[78px]
                      shrink-0
                      object-cover

                      tablet:h-[210px]
                      tablet:w-[140px]

                      desktop:h-[400px]
                      desktop:w-[330px]
                    "
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          className="
            relative
            z-20
            mx-auto
            flex
            justify-center

            mt-[25px]
            tablet:mt-[30px]
            desktop:mt-[45px]
          "
        >
          <Image
            src={LANDING_IMAGES.HERO.PC}
            alt="최애의 포토 화면"
            width={1250}
            height={765}
            priority
            className="
              hidden
              h-auto
              w-[1250px]
              max-w-full
              desktop:block
            "
          />

          <Image
            src={LANDING_IMAGES.HERO.TABLET}
            alt="최애의 포토 화면"
            width={575}
            height={352}
            priority
            className="
              hidden
              h-auto
              w-[575px]
              max-w-full
              tablet:block
              desktop:hidden
            "
          />

          <Image
            src={LANDING_IMAGES.HERO.MOBILE}
            alt="최애의 포토 화면"
            width={325.131}
            height={199}
            priority
            className="
              h-auto
              w-[325.131px]
              max-w-full
              tablet:hidden
            "
          />
        </div>
      </div>
    </section>
  );
}
