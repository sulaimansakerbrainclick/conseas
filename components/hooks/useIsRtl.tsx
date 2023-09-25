import { useRouter } from "next/router";

const useIsRtl = () => {
  const router = useRouter();

  return router.locale === "ar";
};

export default useIsRtl;
