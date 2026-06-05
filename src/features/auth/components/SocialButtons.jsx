"use client";

const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api").replace(
  /\/api$/,
  "",
);

function SocialButton({ href, style, icon, label }) {
  return (
    <a
      href={href}
      style={style}
      className="flex h-[60px] w-full items-center justify-center gap-3 rounded-[2px] text-[18px] font-bold transition hover:brightness-95 active:brightness-90"
    >
      {icon}
      {label}
    </a>
  );
}

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
    <path
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      fill="#FFC107"
    />
    <path
      d="M6.306 14.691l6.571 4.819C14.655 15.108 19.001 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      fill="#FF3D00"
    />
    <path
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      fill="#4CAF50"
    />
    <path
      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      fill="#1976D2"
    />
  </svg>
);

const KakaoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3C6.477 3 2 6.582 2 11c0 2.823 1.7 5.3 4.3 6.85L5.2 21l4.15-2.2C10.1 18.95 11.05 19 12 19c5.523 0 10-3.582 10-8S17.523 3 12 3z"
      fill="#3A1D1D"
    />
  </svg>
);

const NaverIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" fill="white" />
  </svg>
);

export default function SocialButtons({ mode = "login" }) {
  const suffix = mode === "signup" ? "시작하기" : "로그인";

  return (
    <div className="flex w-full flex-col gap-3">
      <SocialButton
        href={`${BASE_URL}/api/auth/google`}
        style={{ backgroundColor: "#ffffff", color: "#0F0F0F", border: "1px solid #DDDDDD" }}
        icon={<GoogleIcon />}
        label={`Google로 ${suffix}`}
      />
      <SocialButton
        href={`${BASE_URL}/api/auth/kakao`}
        style={{ backgroundColor: "#FEE500", color: "#191919" }}
        icon={<KakaoIcon />}
        label={`카카오로 ${suffix}`}
      />
      <SocialButton
        href={`${BASE_URL}/api/auth/naver`}
        style={{ backgroundColor: "#03C75A", color: "#ffffff" }}
        icon={<NaverIcon />}
        label={`네이버로 ${suffix}`}
      />
    </div>
  );
}
