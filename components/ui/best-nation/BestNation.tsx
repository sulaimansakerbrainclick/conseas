import useIsRtl from "@/components/hooks/useIsRtl";
import Carousel from "@/components/reusable/carousel";
import { Section, SectionItem } from "@prisma/client";
import { useTranslation } from "next-i18next";

const settings = {
  slidesToShow: 3,
  speed: 2000,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  slidesToScroll: 1,
  infinite: true,
  initialSlide: 1,
  arrows: false,
  buttons: false,
  variableWidth: true,
};

const responsive = [
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
    },
  },
];

const BestNation = ({ data }: { data: Section & { list: SectionItem[] } }) => {
  const { t } = useTranslation("common");

  const isRtl = useIsRtl();

  const { titleAr, titleEn, textAr, textEn, list } = data;

  return (
    <div className="flex flex-col lg:flex-row items-center">
      <div className="flex-1 mb-8">
        <h2 className="text-4xl mb-2">{isRtl ? titleAr : titleEn}</h2>
        <p>{isRtl ? textAr : textEn}</p>
      </div>

      <div className="w-[100vw] lg:w-[57.5vw] 2xl:w-[50vw]">
        <Carousel items={list} {...settings} {...responsive}>
          {({ image }: SectionItem, index: number) => {
            if (image)
              // eslint-disable-next-line @next/next/no-img-element
              return <img key={index} src={image} alt="" className="w-full h-auto pr-4" />;
          }}
        </Carousel>
      </div>
    </div>
  );
};

export default BestNation;
