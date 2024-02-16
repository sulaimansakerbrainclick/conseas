import React from "react";
import WhatsAppSvg from "./WhatsAppSvg";

const WhatsAppButton = () => {
  return (
    <a
      target="_blank"
      href="https://wa.me/+18329929228"
      className="animate-bounce cursor-pointer fixed z-50 bottom-8 right-6"
    >
      <WhatsAppSvg />
    </a>
  );
};

export default WhatsAppButton;
