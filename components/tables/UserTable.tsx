import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";

import Table from "@mui/material/Table";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Button } from "@mui/material";
import { User } from "@prisma/client";
import dateFormat from "@/configs/dateFormat";
import dayjs from "dayjs";
import showSuccessToast from "@/utils/showSuccessToast";
import userService from "@/services/userService";
import { useContext } from "react";
import SessionContext from "../contexts/SessionContext";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const UserTable = ({ users }: { users: User[] }) => {
  const { t } = useTranslation("common");

  const router = useRouter();

  const { token } = useContext(SessionContext)!;

  const toggleActivation = (id: string, isActive: boolean) => {
    userService.admin
      .blockUser(id, isActive, token)
      .then((res) => {
        showSuccessToast(res.data.message);
      })
      .catch((e) => {});

    router.push(router.asPath);
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>{t("Name")}</TableCell>
          <TableCell>{t("Email")}</TableCell>
          <TableCell>{t("Joining Date")}</TableCell>
          <TableCell>{t("Phone")}</TableCell>
          <TableCell>{t("Block")}</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {users.map(({ id, firstName, lastName, email, phone, isActive, createdAt }) => (
          <TableRow key={id}>
            <TableCell>{firstName + " " + lastName}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{dayjs(createdAt).format(dateFormat)}</TableCell>
            <TableCell>{phone}</TableCell>

            {isActive && (
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => toggleActivation(id, isActive)}
                >
                  <BlockIcon />
                </Button>
              </TableCell>
            )}

            {!isActive && (
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => toggleActivation(id, isActive)}
                >
                  <CheckIcon />
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
