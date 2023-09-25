import { Card, CardContent } from "@mui/material";
import Table from "@mui/material/Table";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

const sales = [
  {
    id: "1",
    country: "United States",
    sales: 2500,
    bounce: "29.9%",
  },
  {
    id: "2",
    country: "Germany",
    sales: 3.9,
    bounce: "40.22%",
  },
  {
    id: "3",
    country: "Great Britain",
    sales: 1.4,
    bounce: "23.44%",
  },
];

const SalesByCountryCard = ({ className }: any) => {
  const { t } = useTranslation("common");

  return (
    <Card className={classNames(className, "shadow-xl")}>
      <CardContent>
        <div className="text-slate-700 text-base font-medium mb-4">{t("Sales by Country")}</div>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>Sales</TableCell>
              <TableCell>Bounce</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sales.map(({ id, country, sales, bounce }: any) => (
              <TableRow key={id}>
                <TableCell>{country}</TableCell>
                <TableCell>{sales}</TableCell>
                <TableCell>{bounce}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SalesByCountryCard;
