import UserTable from "@/components/tables/UserTable";
import { Card, CardContent } from "@mui/material";
import { User } from "@prisma/client";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

const LastUsersCard = ({ className, users }: { className?: string; users: User[] }) => {
  const { t } = useTranslation("common");

  return (
    <Card className={classNames(className, "shadow-xl")}>
      <CardContent>
        <div className="text-slate-700 text-base font-medium mb-4">{t("Last Users")}</div>

        <UserTable users={users} />
      </CardContent>
    </Card>
  );
};

export default LastUsersCard;
