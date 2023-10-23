import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Button } from "@mui/material";
import { Chart, ChartPrice } from "@prisma/client";
import { useTranslation } from "next-i18next";
import Stripe from "stripe";

const ChartTable = ({
  charts,
  deleteChart,
  editChart,
}: {
  charts: (Chart & { prices: ChartPrice[] })[];
  deleteChart: (id: string) => void;
  editChart: (id: string) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>{t("Name")}</TableCell>
          <TableCell>{t("Price")}</TableCell>
          <TableCell>{t("Interval")}</TableCell>
          <TableCell>{t("Interval Count")}</TableCell>
          <TableCell>
            <div className="text-red-600">{t("Delete")}</div>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {charts.map(({ id, nameAr, nameEn, descriptionAr, descriptionEn, prices }) => {
          const price = JSON.parse(
            prices[0].stripePriceResponse as string
          ) as Stripe.Response<Stripe.Price>;

          return (
            <TableRow key={id}>
              <TableCell>{nameEn}</TableCell>
              <TableCell>${(price.unit_amount as number) / 100} </TableCell>
              <TableCell>{price.recurring?.interval} </TableCell>
              <TableCell>{price.recurring?.interval_count}</TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => deleteChart(id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ChartTable;
