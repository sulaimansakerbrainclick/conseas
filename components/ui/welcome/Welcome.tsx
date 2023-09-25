import Image from "next/image";
import { useTranslation } from "next-i18next";
import imaging4Icon from "@/public/assets/icons/imaging4.svg";
import classNames from "classnames";
import useIsRtl from "@/components/hooks/useIsRtl";
import { Section, SectionItem } from "@prisma/client";

const Welcome = ({ data }: { data: Section & { list: SectionItem[] } }) => {
  const { t } = useTranslation("common");

  const isRtl = useIsRtl();

  const { titleAr, titleEn, textAr, textEn, list } = data;

  return (
    <div className="lg:flex">
      <div className="flex-3 flex flex-col justify-center max-lg:mb-8">
        <h2 className="text-4xl uppercase mb-8">{isRtl ? titleAr : titleEn}</h2>

        <p>{isRtl ? textAr : textEn}</p>
      </div>

      <div className="hidden lg:block flex-1">
        <div className="relative flex flex-col h-full items-center justify-around">
          {list.map((_, index) => (
            <Image key={index} src={imaging4Icon} alt="" />
          ))}

          <div className="absolute top-0 bottom-0 -z-[1] border border-solid border-gray-100" />
        </div>
      </div>

      <div className="flex-2">
        <div className="flex flex-col lg:pr-24">
          {list.map(({ id, image, textAr, textEn, titleAr, titleEn }, index) => (
            <div
              key={id}
              className={classNames("max-lg:flex flex-col items-center", {
                "mb-8 lg:mb-11": index !== list.length - 1,
              })}
            >
              {image && <Image src={image} alt="" className="mb-1.5" width={75} height={75} />}

              <div className="font-medium mb-1.5 text-xl">{isRtl ? titleAr : titleEn}</div>

              <p className="text-stone-500 text-sm">{isRtl ? textAr : textEn}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
