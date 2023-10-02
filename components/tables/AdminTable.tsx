import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Button } from "@mui/material";
import dateFormat from "@/configs/dateFormat";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { User } from "@prisma/client";
import EditIcon from "@mui/icons-material/Edit";

const AdminTable = ({
  admins,
  editAdmin,
  deleteAdmin,
}: {
  admins: User[];
  editAdmin: (id: string) => void;
  deleteAdmin: (id: string) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>{t("Name")}</TableCell>
          <TableCell>{t("Email")}</TableCell>
          <TableCell>{t("Phone")}</TableCell>
          <TableCell>{t("Created At")}</TableCell>
          <TableCell>
            <div className="text-color-1">{t("Edit")}</div>
          </TableCell>
          {/* <TableCell>
            <div className="text-red-600">{t("Delete")}</div>
          </TableCell> */}
        </TableRow>
      </TableHead>

      <TableBody>
        {admins.map(({ id, firstName, lastName, email, phone, createdAt }) => (
          <TableRow key={id}>
            <TableCell>{firstName + " " + lastName}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{dayjs(createdAt).format(dateFormat)}</TableCell>
            <TableCell>
              <Button variant="outlined" color="primary" onClick={() => editAdmin(id)}>
                <EditIcon />
              </Button>
            </TableCell>
            {/* <TableCell>
              <Button variant="outlined" color="error" onClick={() => deleteAdmin(id)}>
                <DeleteIcon />
              </Button>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminTable;
