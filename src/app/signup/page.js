import Image from "next/image";
import SignupForm from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-8 px-4 py-10 tablet:gap-[60px] tablet:px-0 tablet:py-16">
      <Image
        src="/img/logos/logo.png"
        alt="최애의 포토"
        width={331}
        height={60}
        className="h-auto w-[200px] tablet:w-[331px]"
        priority
      />
      <SignupForm />
    </div>
  );
}
