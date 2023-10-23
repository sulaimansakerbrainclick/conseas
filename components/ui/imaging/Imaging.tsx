import Image from "next/image";
import imaging4Icon from "@/public/assets/icons/imaging4.svg";
import { useTranslation } from "next-i18next";
import { Section, SectionItem } from "@prisma/client";
import useIsRtl from "@/components/hooks/useIsRtl";

const Imaging = ({ data }: { data: Section & { list: SectionItem[] } }) => {
  const { t } = useTranslation("common");

  const isRtl = useIsRtl();

  const { titleAr, titleEn, textAr, textEn, list } = data;

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-8">
        <div className="mb-1 text-lg">{isRtl ? textAr : textEn}</div>

        <h2 className="text-4xl uppercase">{isRtl ? titleAr : titleEn}</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:mb-6">
        {list.map(({ image, textAr, textEn, titleAr, titleEn, id }, index) => (
          <div key={index} className="flex-1 flex gap-7">
            <div className="flex justify-center items-center p-5 shadow-md bg-white">
              {image && <Image src={image} alt="" width={70} height={70} />}
            </div>

            <div>
              <div className="font-medium mb-4 text-lg lg:text-base">
                {isRtl ? titleAr : titleEn}
              </div>

              <p className="text-stone-500">{isRtl ? textAr : textEn}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative gap-12 hidden lg:flex">
        {[1, 2, 3].map((item, index) => (
          <div key={index} className="flex-1 flex gap-7">
            <div className="flex justify-center items-center p-5">
              <div className="w-17.5" />
            </div>

            <div>
              <div className="font-medium text-xl text-color-1 mb-5">
                {t("Step")} {item}
              </div>

              <Image src={imaging4Icon} alt="" />
            </div>
          </div>
        ))}

        <div className="absolute right-0 left-0 bottom-5 -z-[1] p-0 m-0 border border-solid border-gray-100" />
      </div>
    </div>
  );
};

export default Imaging;
