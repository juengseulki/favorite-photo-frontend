import Image from "next/image";

import { LANDING_IMAGES } from "../constants/landingImages";

function ChatBubble({ children, color = "gray", className = "" }) {
  const colors = {
    blue: {
      bg: "bg-[#00C2FF]",
      tail: "after:border-t-[#00C2FF]",
      text: "text-black",
    },
    gray: {
      bg: "bg-[#5A5A5A]",
      tail: "after:border-t-[#5A5A5A]",
      text: "text-white",
    },
  };

  return (
    <div
      className={`
        absolute z-30
        flex items-center justify-center
        whitespace-nowrap rounded-[10px]
        font-normal

        h-[32px] px-[14px] text-[11px]
        tablet:h-[44px] tablet:px-[20px] tablet:text-[14px]
        desktop:h-[57px] desktop:px-[28px] desktop:text-[17px]

        after:absolute
        after:bottom-[-7px]
        after:border-l-[7px]
        after:border-r-[7px]
        after:border-t-[8px]
        after:border-l-transparent
        after:border-r-transparent

        tablet:after:bottom-[-10px]
        tablet:after:border-l-[10px]
        tablet:after:border-r-[10px]
        tablet:after:border-t-[12px]

        desktop:after:bottom-[-12px]
        desktop:after:border-l-[12px]
        desktop:after:border-r-[12px]
        desktop:after:border-t-[14px]

        ${colors[color].bg}
        ${colors[color].text}
        ${colors[color].tail}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default function NotificationSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-black

        mt-[80px]
        tablet:mt-[110px]
        desktop:mt-[138px]

        h-[519px]
        tablet:h-[776px]
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
            tablet:top-[113px]

            desktop:left-[428px]
            desktop:top-[128px]
          "
        >
          <h2
            className="
              text-[22px]
              font-bold
              leading-[32px]
              text-white

              tablet:text-[28px]
              tablet:leading-[38px]

              desktop:text-[36px]
              desktop:leading-[46px]
            "
          >
            알림으로 보다 <span className="text-[#00C2FF]">빨라진 거래</span>
          </h2>

          <p
            className="
              mt-[20px]
              text-[14px]
              leading-[24px]
              text-gray-200

              desktop:text-[18px]
              desktop:leading-[28px]
            "
          >
            교환 제안이 오면 바로 확인하고,
            <br />
            실시간 알림으로 놓치지 마세요
          </p>
        </div>

        {/* 파란 배경 원 */}
        <div
          className="
            absolute
            z-0

            rounded-full
            border-2
            border-[#00C2FF]
            opacity-20
            bg-[linear-gradient(180deg,#00C2FF_0%,#0F0F0F_48.81%)]
            shadow-[inset_0_0_50px_0_rgba(255,255,255,0.10)]

            h-[279px]
            w-[279px]
            right-[60px]
            top-[334px]

            tablet:h-[593px]
            tablet:w-[593px]
            tablet:right-[264px]
            tablet:top-[548px]

            desktop:h-[1480px]
            desktop:w-[1480px]
            desktop:right-[231px]
            desktop:top-[407px]
        "
        />

        {/* 이미지 */}
        <Image
          src={LANDING_IMAGES.NOTIFICATION.PC}
          alt=""
          width={754}
          height={511}
          className="
            absolute
            z-10

            hidden
            desktop:block

            right-[420px]
            bottom-[51px]
          "
        />

        <Image
          src={LANDING_IMAGES.NOTIFICATION.TABLET}
          alt=""
          width={577.563}
          height={383}
          className="
            hidden
            tablet:block
            desktop:hidden

            absolute
            bottom-[40px]
            right-[70.44px]
          "
        />

        <Image
          src={LANDING_IMAGES.NOTIFICATION.MOBILE}
          alt=""
          width={325.997}
          height={226}
          className="
            tablet:hidden

            absolute
            bottom-[10px]
            right-[11px]
          "
        />

        <ChatBubble
          color="blue"
          className="
            left-[61px]
            top-[174.16px]
            after:left-[18px]

            tablet:left-[70px]
            tablet:top-[270px]
            tablet:after:left-[28px]

            desktop:left-[443px]
            desktop:top-[359.91px]
            desktop:after:left-[35px]
          "
        >
          제 포카랑 교환해요 👋
        </ChatBubble>

        <ChatBubble
          color="gray"
          className="
            right-[77px]
            top-[223.77px]
            after:right-[18px]

            tablet:right-[387.52px]
            tablet:top-[339.09px]
            tablet:after:right-[28px]

            desktop:right-[1060px]
            desktop:top-[450.01px]
            desktop:after:right-[35px]
          "
        >
          [스페인 여행] 포카 사고 싶어요! 🏝️
        </ChatBubble>
      </div>
    </section>
  );
}
