import Image from "next/image";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { Service } from "@prisma/client";
import useIsRtl from "@/components/hooks/useIsRtl";
import heroImage from "@/public/assets/images/home1.png";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import HeroService from "../hero-service/HeroService";

const LgHero = ({
  className,
  services,
  appSettings,
}: {
  className?: string;
  services: Service[];
  appSettings: AppSettingFormValues;
}) => {
  const { t } = useTranslation("common");

  const isRtl = useIsRtl();

  const title = isRtl ? appSettings.heroTitleAr : appSettings.heroTitleEn;
  const subtitle = isRtl ? appSettings.heroSubTitleAr : appSettings.heroSubTitleEn;

  return (
    <div className={classNames(className, "relative")}>
      <Image
        src={heroImage}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        unoptimized
        className="-z-[1] object-cover"
      />

      <div className="container min-h-screen flex flex-col justify-between pt-[30%] lg:pt-[12.5%] pb-[7%]">
        <div className="flex flex-col items-center mb-8">
          <h1 className="uppercase text-5xl lg:text-6xl mb-4">{title}</h1>

          <p className="text-2xl font-normal text-stone-500">{subtitle}</p>
        </div>

        <div className="w-full lg:flex justify-between items-center">
          {services.map(({ id, image, nameAr, nameEn, shortDescriptionEn, shortDescriptionAr }) => (
            <HeroService
              key={id}
              image={image}
              nameAr={nameAr}
              nameEn={nameEn}
              href={`/services/${id}`}
              descriptionEn={shortDescriptionEn}
              descriptionAr={shortDescriptionAr}
            />
          ))}

          <HeroService
            image="/assets/icons/services/My Chart Mangment.svg"
            nameAr={t("My Chart Management")}
            nameEn={t("My Chart Management")}
            href="/my-chart-management"
            descriptionEn={t("Electronic medical record management" || "") as string}
            descriptionAr={t("Electronic medical record management" || "") as string}
          />
        </div>
      </div>
    </div>
  );
};

export default LgHero;
