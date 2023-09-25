import useIsRtl from "../hooks/useIsRtl";

import { Roboto } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const FontProvider = ({ children }: any) => {
  const isRtl = useIsRtl();

  return <div className={isRtl ? roboto.className : roboto.className}>{children}</div>;
};

export default FontProvider;
