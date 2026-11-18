import { AuthForm } from "@/components/AuthForm";
import { PageLayout } from "@/components/PageLayout";

export default function LoginPage() {
  return (
    <PageLayout>
      <AuthForm mode="login" />
    </PageLayout>
  );
}
