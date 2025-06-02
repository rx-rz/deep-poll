import { AuthLayout } from "../auth-layout";
import { RegisterForm } from "../containers/register-form";

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
