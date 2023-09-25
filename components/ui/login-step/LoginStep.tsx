import DonthaveAccount from "@/components/ui/dont-have-account/DontHaveAccount";
import LoginForm, { LoginFormValues } from "@/components/forms/login-form/LoginForm";
import authService from "@/services/authService";
import sessionService from "@/services/sessionService";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import useLogin from "@/components/hooks/useLogin";

const LoginStep = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation("common");

  const router = useRouter();

  const { handleSubmit } = useLogin((user) => {
    router.push(router.asPath);
    onNext();
  });

  return (
    <>
      <div className="font-bold text-3xl text-color-1 mb-13 text-center">
        {t("Before we get started, Please login below")}
      </div>

      <LoginForm
        onSubmit={handleSubmit}
        initialValues={{
          emailOrPhone: "",
          password: "",
        }}
      />

      <DonthaveAccount className="mt-8" />
    </>
  );
};

export default LoginStep;
