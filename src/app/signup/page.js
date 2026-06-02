import SignupForm from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-10">
      <h1 className="font-brand text-[32px] font-bold text-[#DDDDDD]">
        최애<span className="text-[#FFFF04]">의</span>포토
      </h1>
      <SignupForm />
    </div>
  );
}
