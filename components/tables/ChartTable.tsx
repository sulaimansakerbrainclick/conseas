import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Button } from "@mui/material";
import { Chart } from "@prisma/client";
import { useTranslation } from "next-i18next";

const ChartTable = ({
  charts,
  deleteChart,
  editChart,
}: {
  charts: Chart[];
  deleteChart: (id: string) => void;
  editChart: (id: string) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>{t("Name")}</TableCell>
          <TableCell>{t("Description")}</TableCell>
          <TableCell>{t("Price")}</TableCell>
          <TableCell>{t("Interval")}</TableCell>
          <TableCell>{t("Interval Count")}</TableCell>
          <TableCell>
            <div className="text-red-600">{t("Delete")}</div>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {charts.map(
          ({
            id,
            nameAr,
            nameEn,
            descriptionAr,
            descriptionEn,
            interval,
            intervalCount,
            price,
          }) => (
            <TableRow key={id}>
              <TableCell>{nameEn}</TableCell>
              <TableCell>{descriptionEn}</TableCell>
              <TableCell>${price} </TableCell>
              <TableCell>{interval}</TableCell>
              <TableCell>{intervalCount}</TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => deleteChart(id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default ChartTable;
