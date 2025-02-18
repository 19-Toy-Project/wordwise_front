import { Suspense } from "react";
import { LoginComponent } from "./_components/LoginComponent";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginComponent />
    </Suspense>
  );
}
