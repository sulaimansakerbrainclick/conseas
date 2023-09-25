import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styles from "./ScrollToTop.module.scss";
import upIcon from "../../../public/icons/up.svg";
import Image from "next/image";

const ScrollTopBtn = () => {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 700) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    document.addEventListener("scroll", toggleVisible);

    return () => document.body.removeEventListener("scroll", toggleVisible);
  }, []);

  if (visible) {
    return (
      <button className={classNames(styles.button, "rounded-full")} onClick={scrollToTop}>
        <div className="w-5 h-6">
          <Image src={upIcon} alt="scroll-to-top" width="20" height="23" />
        </div>
      </button>
    );
  }

  return null;
};

export default ScrollTopBtn;
