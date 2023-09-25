import Table from "@mui/material/Table";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Language } from "@prisma/client";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "next-i18next";

const LanguageTable = ({
  languages,
  deleteLanguage,
}: {
  languages: (Language & { parent: Language })[];
  deleteLanguage: (name: string) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>{t("key")}</TableCell>
          <TableCell>
            <div className="text-red-600">{t("Delete")}</div>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {languages.map(({ key }) => (
          <TableRow key={key}>
            <TableCell>{key}</TableCell>

            <TableCell>
              <Button variant="outlined" color="error" onClick={() => deleteLanguage(key)}>
                <DeleteIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LanguageTable;
