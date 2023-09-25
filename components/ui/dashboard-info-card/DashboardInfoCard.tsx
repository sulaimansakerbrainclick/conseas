import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

const DashboardInfoCard = ({
  title,
  fromDate,
  toDate,
  text1,
  text2,
  className,
}: {
  title: string;
  fromDate: string;
  toDate: string;
  text1: string;
  text2: string;
  className?: string;
}) => {
  const { t } = useTranslation("common");

  return (
    <Card className={classNames(className, "shadow-xl")}>
      <CardContent>
        <div className="flex justify-between mb-1 items-center">
          <div className="text-slate-500 text-sm font-medium">{title}</div>
          <div className="text-slate-500 text-xs">
            {fromDate} - {toDate}
          </div>
        </div>

        <div className="text-lg font-bold text-slate-700 mb-1">{text1}</div>

        <div className="text-sm">
          <span className="text-green-500">{text2}</span>{" "}
          <span className="text-slate-500">{t("since last month")}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardInfoCard;
