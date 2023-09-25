import doctorIcon from "@/public/assets/icons/doctor.svg";
import { Button } from "@mui/material";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

const ThankYouStep = () => {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col items-center">
      <Image src={doctorIcon} alt="" />

      <h1 className="mb-9">{t("Thank you")}</h1>

      <p className="mb-12.5">
        {t(
          "Thank you for choosing Conseas You will receive notification of your request as soon as possible"
        )}
      </p>

      <Link href="/home">
        <Button variant="contained">{t("Go Home")}</Button>
      </Link>
    </div>
  );
};

export default ThankYouStep;
