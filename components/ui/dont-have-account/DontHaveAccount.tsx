import classNames from "classnames";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const DonthaveAccount = ({ className }: any) => {
  const { t } = useTranslation("common");

  return (
    <div className={classNames("text-center text-black-2 font-light", className)}>
      {t("Don’t have an account?")}{" "}
      <Link href="/register" className="font-medium text-color-1">
        {t("Create an account")}
      </Link>
    </div>
  );
};

export default DonthaveAccount;
