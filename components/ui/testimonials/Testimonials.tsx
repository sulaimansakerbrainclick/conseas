import Image from "next/image";
import Carousel from "@/components/reusable/carousel";
import { useTranslation } from "next-i18next";
import useIsRtl from "@/components/hooks/useIsRtl";
import { Section, SectionItem, Testimonial } from "@prisma/client";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRef } from "react";

const Testimonials = ({
  data,
  testimonials,
}: {
  data: Section & { list: SectionItem[] };
  testimonials: Testimonial[];
}) => {
  const { t } = useTranslation("common");

  const isRtl = useIsRtl();

  const carouselRef = useRef<any>();

  const { titleAr, titleEn, textAr, textEn, list } = data;

  return (
    <div className="lg:flex justify-between flex-col lg:flex-row">
      <div className="lg:w-2/3 lg:pt-32 lg:pb-42 max-lg:mb-8">
        <h2 className="text-4xl mb-8">{isRtl ? titleAr : titleEn}</h2>

        <div className="relative">
          {testimonials.length > 1 && (
            <>
              <IconButton
                className="absolute bottom-2 rtl:left-13 ltr:right-0 z-[1] bg-neutral-200"
                onClick={() =>
                  isRtl ? carouselRef.current.slickNext() : carouselRef.current.slickPrev()
                }
              >
                <KeyboardArrowRightIcon color="primary" />
              </IconButton>

              <IconButton
                className="absolute bottom-2 rtl:left-0 ltr:right-13 z-[1] bg-neutral-200"
                onClick={() =>
                  isRtl ? carouselRef.current.slickPrev() : carouselRef.current.slickNext()
                }
              >
                <KeyboardArrowLeftIcon color="primary" />
              </IconButton>
            </>
          )}

          <Carousel items={testimonials} slidesToShow={1} myRef={carouselRef} arrows={false}>
            {({ id, nameAr, nameEn, textAr, textEn, image }: Testimonial, index: number) => {
              return (
                <>
                  <blockquote className="font-light italic text-4.5 p-0 m-0 mb-8">
                    “{isRtl ? textAr : textEn}”
                  </blockquote>

                  <div className="flex gap-4">
                    <div className="relative w-15 h-15">
                      {image && <Image fill src={image} alt="" />}
                    </div>

                    <div>
                      <div className="font-times font-medium text-xl">
                        {isRtl ? nameAr : nameEn}
                      </div>

                      <div className="font-medium">{t("Patient")}</div>
                    </div>
                  </div>
                </>
              );
            }}
          </Carousel>
        </div>
      </div>

      {list.length !== 0 && (
        <div className="flex flex-col justify-end">
          <div className="shadow-2xl">
            <div className="flex flex-col gap-12 bg-white p-10 rounded-t-sm">
              {list.map(({ id, image, textAr, textEn, titleAr, titleEn }) => (
                <div className="flex items-center gap-10" key={id}>
                  {image && <Image src={image} alt="" width={56} height={56} />}

                  <div>
                    <div className="font-times font-bold text-4xl text-color-1 mb-1">
                      {isRtl ? textAr : textEn}
                    </div>

                    <div className="font-light text-black text-base">
                      {isRtl ? titleAr : titleEn}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
