import Image from "next/image";
import facebookIcon from "@/public/assets/icons/facebook.svg";
import googleIcon from "@/public/assets/icons/goggle.svg";
import { useTranslation } from "next-i18next";

const SocialLogin = ({ className }: any) => {
  const { t } = useTranslation("common");

  return (
    <div className={className}>
      <div className="text-center text-black font-medium mb-3">{t("Or login with")}</div>

      <div className="flex justify-center gap-12 mb-8">
        <button>
          <Image src={googleIcon} alt="" className="w-12 h-12" />
        </button>

        <button>
          <Image src={facebookIcon} alt="" className="w-12 h-12" />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
