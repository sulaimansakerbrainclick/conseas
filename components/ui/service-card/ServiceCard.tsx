import useIsRtl from "@/components/hooks/useIsRtl";
import { Service } from "@prisma/client";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./ServiceCard.module.scss";

const ServiceCard = ({ service }: { service: Service }) => {
  const isRtl = useIsRtl();

  const [hovered, setHovered] = useState(false);

  const { id, image, nameAr, nameEn, whiteImage } = service;

  const handleMouseOver = () => {
    setTimeout(() => {
      setHovered(true);
    }, 150);
  };

  const handleMouseOut = () => {
    setTimeout(() => {
      setHovered(false);
    }, 150);
  };

  return (
    <div
      className={classNames("h-full basis-1/2 lg:basis-1/4 xl:basis-1/6 p-2 lg:p-4", {
        [styles.hovered]: hovered,
        [styles.notHovered]: !hovered,
      })}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link
        href={`/service-request/${id}`}
        className="link w-full flex flex-col items-center py-6 transition-all"
      >
        <div className="blue-image mb-8">
          <Image src={image || ""} alt="" width={70} height={70} />
        </div>

        <div className="white-image mb-8">
          <Image src={whiteImage || ""} alt="" width={70} height={70} />
        </div>

        <div className="font-medium text-xl text-center h-15 flex flex-col justify-center">
          {isRtl ? nameAr : nameEn}
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
