import Image from "next/image";
import SignupForm from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-[60px] py-16">
      <Image src="/img/logos/logo.png" alt="최애의 포토" width={331} height={60} priority />
      <SignupForm />
    </div>
  );
}
