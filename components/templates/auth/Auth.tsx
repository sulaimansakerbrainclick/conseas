import React from "react";
import Image from "next/image";
import authJpg from "@/public/assets/images/auth.jpg";
import Header from "@/components/ui/header/Header";
import { Service } from "@prisma/client";
import { useTranslation } from "next-i18next";

interface Props {
  title: string;
  form?: React.ReactNode;
  children?: React.ReactNode;
  services: (Service & { children: Service[] })[];
}

const AuthTemplate = ({ title, form, services, children }: Props) => {
  const { t } = useTranslation("common");

  return (
    <>
      <Header services={services} />

      <div className="relative flex flex-col justify-center items-center min-h-[calc(100vh-var(--header-height))]">
        {svg1}

        <div className="container">
          <div className="lg:h-[calc(100vh-112px)] 2xl:h-[680px] relative bg-white rounded-l-sm rounded-r-sm lg:my-14 shadow-xl">
            <div className="lg:absolute top-0 ltr:left-0 rtl:write-0 bottom-0 lg:w-1/2 max-lg:px-6 max-lg:py-6 lg:px-15.5 h-full flex flex-col justify-center rounded-l-sm z-[1]">
              <h1 className="mb-5.5 max-lg:text-center">{title}</h1>

              {form}

              {children}
            </div>

            <div className="hidden lg:flex justify-end h-full">
              <Image
                src={authJpg}
                alt=""
                className="h-full w-auto rounded-r-sm rtl:[transform:scaleX(-1)]"
                unoptimized={false}
              ></Image>
            </div>
          </div>
        </div>

        {svg2}
      </div>
    </>
  );
};

export default AuthTemplate;

const svg1 = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1728"
    height="518"
    viewBox="0 0 1728 518"
    fill="none"
    preserveAspectRatio="none"
    className="absolute top-0 right-0 left-0 w-full -z-[2] h-[35%] md:h-[40%] lg:h-50"
  >
    <path
      opacity="0.62"
      d="M0 0L1728 0V416.6C958 416.6 878 665.883 0 382.73L0 0Z"
      fill="url(#paint0_linear_83_12381)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_83_12381"
        x1="864"
        y1="0"
        x2="864"
        y2="518"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6BB1FC" />
        <stop offset="1" stopColor="#419DFF" />
      </linearGradient>
    </defs>
  </svg>
);

const svg2 = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1728"
    height="518"
    viewBox="0 0 1728 518"
    fill="none"
    preserveAspectRatio="none"
    className="absolute bottom-0 right-0 left-0 w-full -z-[2] h-[35%] md:h-[40%] lg:h-50"
  >
    <path
      opacity="0.62"
      d="M1728 518L0 518L-3.64204e-05 101.4C770 101.4 850 -147.883 1728 135.27L1728 518Z"
      fill="url(#paint0_linear_83_12381)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_83_12381"
        x1="864"
        y1="518"
        x2="864"
        y2="1.44981e-05"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6BB1FC" />
        <stop offset="1" stopColor="#419DFF" />
      </linearGradient>
    </defs>
  </svg>
);
