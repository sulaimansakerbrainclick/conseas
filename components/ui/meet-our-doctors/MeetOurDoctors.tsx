import Carousel from "@/components/reusable/carousel";
import doctor1Image from "@/public/assets/temp/doctor1.png";
import { Doctor } from "@prisma/client";
import { useTranslation } from "next-i18next";
import Image from "next/image";

const settings = {
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
};

const responsive = [
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 3,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1.1,
      arrows: false,
    },
  },
];

const doctors = [
  {
    name: "Doctor1",
    specialization: "Dentist",
    des: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    image: doctor1Image,
  },
  {
    name: "Doctor2",
    specialization: "Dentist",
    des: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    image: doctor1Image,
  },
  {
    name: "Doctor3",
    specialization: "Dentist",
    des: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    image: doctor1Image,
  },
];

const MeetOurDoctors = ({ doctors }: { doctors: Doctor[] }) => {
  const { t } = useTranslation("common");

  return (
    <div>
      <h2 className="text-center">{t("Meet Our Doctors")}</h2>

      <p className="text-center mb-15">
        Meet your well-qualified doctors, who work diligently to ensure you get perfect medical
        services. They watch your health and are very helpful.
      </p>

      <Carousel items={doctors} {...settings} responsive={responsive}>
        {({ firstNameEn, lastNameEn, specializationEn, image }: Doctor, index: number) => {
          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center bg-white py-9 px-4.5 border border-solid rounded-sm border-neutral-200 mx-3 lg:mx-6"
            >
              {image && (
                <div className="relative w-50 h-50 lg:w-65 lg:h-65 mb-6">
                  <Image src={image} alt="" fill className="rounded-full" />
                </div>
              )}

              <div className="font-medium text-xl mb-1">
                {firstNameEn} {lastNameEn}
              </div>

              <div className="font-light text-sm mb-1.5">{specializationEn}</div>

              {/* <p className="text-center text-neutral-400 text-sm">{des}</p> */}
            </div>
          );
        }}
      </Carousel>
    </div>
  );
};

export default MeetOurDoctors;
