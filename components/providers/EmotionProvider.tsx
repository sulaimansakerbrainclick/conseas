import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import useIsRtl from "../hooks/useIsRtl";

export const getCache = (isRtl: boolean) =>
  createCache({
    key: "css",
    prepend: true,
    stylisPlugins: isRtl ? [prefixer, rtlPlugin] : [],
  });

const EmotionProvider = ({ children }: any) => {
  const isRtl = useIsRtl();

  return <CacheProvider value={getCache(isRtl)}>{children}</CacheProvider>;
};

export default EmotionProvider;
