import Image from "next/image";
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-[60px]">
      <Image src="/img/logos/logo.png" alt="최애의 포토" width={331} height={60} priority />
      <LoginForm />
    </div>
  );
}
