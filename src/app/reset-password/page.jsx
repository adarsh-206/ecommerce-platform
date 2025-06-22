import { Suspense } from "react";
import ResetPasswordForm from "@/components/password/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={<p className="text-white text-center mt-10">Loading...</p>}
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
