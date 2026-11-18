import { AuthForm } from "@/components/AuthForm";
import { PageLayout } from "@/components/PageLayout";

export default function RegisterPage() {
  return (
    <PageLayout>
      <AuthForm mode="register" />
    </PageLayout>
  );
}
