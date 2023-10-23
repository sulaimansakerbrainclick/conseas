import useIsRtl from "@/components/hooks/useIsRtl";
import whyChoose1Icon from "@/public/assets/icons/why-choose1.svg";
import whyChoose2Icon from "@/public/assets/icons/why-choose2.svg";
import whyChoose3Icon from "@/public/assets/icons/why-choose3.svg";
import whyChoose4Icon from "@/public/assets/icons/why-choose4.svg";
import { Section, SectionItem } from "@prisma/client";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import Image from "next/image";

const items = [
  {
    key: "Quality",
    value: "100%",
    icon: whyChoose1Icon,
  },
  {
    key: "Patients a year",
    value: "5791",
    icon: whyChoose2Icon,
  },
  {
    key: "Appointments",
    value: "150+",
    icon: whyChoose3Icon,
  },
  {
    key: "People working",
    value: "38",
    icon: whyChoose4Icon,
  },
];

const WhyChoose = ({ data }: { data: Section & { list: SectionItem[] } }) => {
  const { t } = useTranslation("common");

  const isRtl = useIsRtl();

  const { titleAr, titleEn, textAr, textEn, list } = data;

  return (
    <div className="flex flex-col lg:flex-row items-center lg:gap-16">
      <div className="flex-1 max-lg:mb-8">
        <h2 className="text-4xl uppercase mb-8">{isRtl ? titleAr : titleEn}</h2>

        <p>{isRtl ? textAr : textEn}</p>
      </div>

      <div className="flex-1">
        <div className="lg:flex flex-wrap max-lg:justify-between">
          {list.map(({ image, textAr, textEn, titleAr, titleEn, id }, index) => (
            <div
              key={index}
              className={classNames("basis-1/2 max-lg:mb-8", {
                "lg:ltr:border-r lg:rtl:border-l border-color-1 lg:pr-8": index % 2 === 0,
                "lg:ltr:pl-12 lg:rtl:pr-12": index % 2 !== 0,
                "lg:mb-13": index < 2,
              })}
            >
              <div className="flex items-center gap-8 lg:gap-10">
                {image && (
                  <Image
                    src={image}
                    alt=""
                    className="w-10 lg:w-14 h-10 lg:h-14"
                    width={55}
                    height={55}
                  />
                )}

                <div className="w-full">
                  <div className="font-times text-4xl text-color-1">{isRtl ? textAr : textEn}</div>

                  <div className="font-medium text-lg">{isRtl ? titleAr : titleEn}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
