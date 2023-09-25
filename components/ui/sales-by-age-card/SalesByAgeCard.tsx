import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";
import { Card, CardContent } from "@mui/material";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const SalesByAgeCard = ({ className }: any) => {
  const { t } = useTranslation("common");

  return (
    <Card className={classNames(className, "shadow-xl")}>
      <CardContent>
        <div className="text-slate-700 text-base font-medium mb-4">{t("Sales by Age")}</div>

        <BarChart layout="vertical" width={450} height={350} data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line dataKey="uv" stroke="#ff7300" />
        </BarChart>
      </CardContent>
    </Card>
  );
};

export default SalesByAgeCard;
