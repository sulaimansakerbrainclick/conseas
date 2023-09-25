import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Button } from "@mui/material";
import { Testimonial } from "@prisma/client";
import { useTranslation } from "next-i18next";

const TestimonialTable = ({
  testimonials,
  editTestimonial,
  deleteTestimonial,
}: {
  testimonials: Testimonial[];
  editTestimonial: (id: string) => void;
  deleteTestimonial: (id: string) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>{t("Name")}</TableCell>
          <TableCell>{t("Text")}</TableCell>
          <TableCell>
            <div className="text-color-1">{t("Edit")}</div>
          </TableCell>
          <TableCell>
            <div className="text-red-600">{t("Delete")}</div>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {testimonials.map(({ id, image, nameAr, nameEn, textAr, textEn, createdAt }) => (
          <TableRow key={id}>
            <TableCell>{nameEn}</TableCell>
            <TableCell>{textEn}</TableCell>
            <TableCell>
              <Button variant="outlined" color="primary" onClick={() => editTestimonial(id)}>
                <EditIcon />
              </Button>
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="error" onClick={() => deleteTestimonial(id)}>
                <DeleteIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TestimonialTable;
