import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import defaultProfileImage from "@/public/assets/images/default-profile-image.svg";
import SessionContext from "@/components/contexts/SessionContext";
import classNames from "classnames";
import { useRouter } from "next/router";
import userLinks from "@/data/userLinks";
import { Role } from "@prisma/client";
import adminLinks from "@/data/adminLinks";
import { useTranslation } from "next-i18next";
import onLogoutClick from "@/utils/onLogoutClick";
import { Button } from "@mui/material";

function DshboardTemplate({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { t } = useTranslation("common");

  const { user } = useContext(SessionContext)!;

  const router = useRouter();

  const links = user.role === Role.Admin ? adminLinks : userLinks;

  return (
    <>
      {header}

      <div className="flex mb-16">
        <div className="hidden lg:flex flex-col items-center py-10 w-[25%] 2xl:w-[20%] bg-slate-50 px-6">
          <div className="relative w-[6.625rem] h-[6.625rem] mb-7">
            <Image
              src={user.image || defaultProfileImage}
              alt=""
              fill
              className="rounded-full"
              sizes="100w"
            />
          </div>

          <div className="text-3xl text-color-1 font-bold font-times">
            {user.firstName + " " + user.lastName}
          </div>

          <Button onClick={(e) => onLogoutClick(e, router)}>
            <div className="text-red-600 text-base mb-11.5">{t("Log out")}</div>
          </Button>

          {links.map(({ href, label }, index) => {
            const isCurrent = href === router.pathname;

            return (
              <Link
                href={href}
                key={index}
                className={classNames("mb-4 text-base font-light", {
                  "text-color-1 font-medium": isCurrent,
                })}
              >
                {t(label)}
              </Link>
            );
          })}
        </div>

        <div className="grow w-[75vw] 2xl:w-[80%]">
          <div className="p-8">{children}</div>
        </div>
      </div>

      {footer}
    </>
  );
}

export default DshboardTemplate;
