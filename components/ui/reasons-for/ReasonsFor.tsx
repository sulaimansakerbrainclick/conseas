import Image from "next/image";
import { useTranslation } from "next-i18next";
import { Section, SectionItem } from "@prisma/client";
import useIsRtl from "@/components/hooks/useIsRtl";

const ReasonsFor = ({ data }: { data: Section & { list: SectionItem[] } }) => {
  const { t } = useTranslation("common");

  const isRtl = useIsRtl();

  const { titleAr, titleEn, textAr, textEn, list } = data;

  return (
    <div>
      <h2 className="text-4xl text-center mb-2">{isRtl ? titleAr : titleEn}</h2>

      <p className="text-center mb-8">{isRtl ? textAr : textEn}</p>

      <div className="flex flex-col lg:flex-row flex-wrap gap-8 lg:gap-18 text-center">
        {list.map(({ id, image, textAr, textEn, titleAr, titleEn }, index) => (
          <div key={index} className="flex-1 flex flex-col items-center bg-white">
            {image && (
              <div className="relative h-12.5 w-12.5 mb-5">
                <Image src={image} alt="" fill />
              </div>
            )}

            <div className="font-medium text-xl mb-5"> {isRtl ? titleAr : titleEn}</div>

            <p>{isRtl ? textAr : textEn}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReasonsFor;
