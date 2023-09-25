import useIsRtl from "@/components/hooks/useIsRtl";
import { Chart } from "@prisma/client";
import { useTranslation } from "next-i18next";
import LoadingButton from "@mui/lab/LoadingButton";

const ChartCardList = ({
  data,
  onSubscribeClick,
  chartToCheckout,
}: {
  data: Chart[];
  onSubscribeClick: (id: string) => void;
  chartToCheckout: string | null;
}) => {
  const { t } = useTranslation("common");

  const isRtl = useIsRtl();

  return (
    <div className="flex flex-col lg:flex-row flex-wrap max-lg:gap-8">
      {data.map(
        ({ id, nameEn, nameAr, descriptionAr, descriptionEn, intervalCount, interval, price }) => {
          return (
            <div key={id} className="basis-1/3">
              <div className="h-full flex flex-col justify-between bg-white py-9 px-6.5 border border-solid rounded-sm border-neutral-200 shadow-2xl mx-10 hover:cursor-pointer hover:scale-110 transition-all">
                <div className="grow">
                  <div className="text-center font-bold text-4xl text-color-1 mb-1.5">${price}</div>

                  <div className="text-center font-bold text-sm mb-8">
                    {t("Per")} {intervalCount} {interval}
                  </div>

                  <h3 className="uppercase text-center text-4xl mb-7.5">
                    {isRtl ? nameAr : nameEn}
                  </h3>

                  <p className="text-sm mb-9">{isRtl ? descriptionAr : descriptionEn}</p>
                </div>

                <div className="text-center">
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    onClick={() => onSubscribeClick(id)}
                    disabled={!!chartToCheckout}
                    loading={chartToCheckout === id}
                  >
                    {t("Subscribe Now")}
                  </LoadingButton>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ChartCardList;
