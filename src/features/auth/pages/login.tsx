import { AuthLayout } from "../auth-layout";
import { LoginForm } from "../containers/login-form";

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
