import React, { LegacyRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import styles from "./carousel.module.scss";
import useIsRtl from "@/components/hooks/useIsRtl";

const settings = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

interface Props extends Omit<Settings, "children"> {
  items: any[];
  children: (item: any, index: number) => React.ReactNode;
  slidesToShow?: number;
  isRtl?: boolean;
  responsive?: any;
  myRef?: any;
}

const Carousel = ({ items, slidesToShow, children, responsive, myRef, ...props }: Props) => {
  const isRtl = useIsRtl();

  return (
    <Slider
      {...settings}
      rtl={isRtl}
      ref={myRef}
      responsive={responsive}
      slidesToShow={slidesToShow}
      className={styles.carousel}
      {...props}
    >
      {items?.map((item: any, index: any) => (
        <div key={index} className="h-full">
          {children(item, index)}
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
