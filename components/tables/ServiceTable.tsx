import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Button } from "@mui/material";
import { Service } from "@prisma/client";
import { Switch } from "@mui/material";
import { useTranslation } from "next-i18next";

const ServiceTable = ({
  services,
  toggleServiceActivation,
  deleteService,
  editService,
}: {
  services: (Service & { parent: Service })[];
  toggleServiceActivation: (id: string) => void;
  deleteService: (id: string) => void;
  editService: (id: string) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>{t("Name")}</TableCell>
          <TableCell>{t("Parent")}</TableCell>
          <TableCell>{t("Price")}</TableCell>
          <TableCell>{t("Active")}</TableCell>
          <TableCell>
            <div className="text-color-1">{t("Edit")}</div>
          </TableCell>
          <TableCell>
            <div className="text-red-600">{t("Delete")}</div>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {services.map(({ id, nameEn, parent, price, isActive, createdAt }) => (
          <TableRow key={id}>
            <TableCell>{nameEn}</TableCell>
            <TableCell>{parent ? parent.nameEn : "-"}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>
              <Switch
                checked={isActive}
                onChange={() => toggleServiceActivation(id)}
                inputProps={{ "aria-label": "controlled" }}
              />
            </TableCell>
            <TableCell>
              {
                <Button variant="outlined" color="primary" onClick={() => editService(id)}>
                  <EditIcon />
                </Button>
              }
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="error" onClick={() => deleteService(id)}>
                <DeleteIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ServiceTable;
