import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Button } from "@mui/material";
import { Doctor } from "@prisma/client";
import dateFormat from "@/configs/dateFormat";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";

const DoctorTable = ({
  doctors,
  editDoctor,
  deleteDoctor,
}: {
  doctors: Doctor[];
  editDoctor: (id: string) => void;
  deleteDoctor: (id: string) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>{t("Name")}</TableCell>
          <TableCell>{t("Email")}</TableCell>
          <TableCell>{t("Description")}</TableCell>
          <TableCell>{t("Specialization")}</TableCell>
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
        {doctors.map(
          ({ id, firstNameEn, lastNameEn, email, phone, specializationEn, createdAt }) => (
            <TableRow key={id}>
              <TableCell>{firstNameEn + " " + lastNameEn}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{phone}</TableCell>
              <TableCell>{specializationEn}</TableCell>
              <TableCell>{dayjs(createdAt).format(dateFormat)}</TableCell>

              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => editDoctor(id)}>
                  <EditIcon />
                </Button>
              </TableCell>

              <TableCell>
                <Button variant="outlined" color="error" onClick={() => deleteDoctor(id)}>
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

export default DoctorTable;
