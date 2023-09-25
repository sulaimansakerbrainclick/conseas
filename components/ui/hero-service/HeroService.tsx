import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useIsRtl from "@/components/hooks/useIsRtl";
import { useTranslation } from "next-i18next";

const HeroService = ({
  href,
  image,
  nameAr,
  nameEn,
  descriptionEn,
  descriptionAr,
}: {
  href: string;
  image?: string | null;
  nameAr: string;
  nameEn: string;
  descriptionEn: string;
  descriptionAr: string;
}) => {
  const { t } = useTranslation("common");

  const isRtl = useIsRtl();

  return (
    <div className="max-lg:mb-8">
      {image && <Image className="w-15 h-15 mb-4" src={image} alt="" width={60} height={60} />}

      <div>
        <span className="text-neutral-400 mb-2 text-lg font-bold">{t("Service")}</span>
      </div>

      <div className="mb-4">
        <h2 className="uppercase font-semibold text-2xl">{isRtl ? nameAr : nameEn}</h2>

        <p>{isRtl ? descriptionAr : descriptionEn}</p>
      </div>

      <Link href={href}>
        <Button variant="contained" endIcon={isRtl ? <ArrowBackIcon /> : <ArrowForwardIcon />}>
          {t("Start Now")}
        </Button>
      </Link>
    </div>
  );
};

export default HeroService;
