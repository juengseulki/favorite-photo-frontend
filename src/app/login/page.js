import Image from "next/image";
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-8 px-4 tablet:gap-[60px] tablet:px-0">
      <Image
        src="/img/logos/logo.png"
        alt="최애의 포토"
        width={331}
        height={60}
        className="h-auto w-[200px] tablet:w-[331px]"
        priority
      />
      <LoginForm />
    </div>
  );
}
