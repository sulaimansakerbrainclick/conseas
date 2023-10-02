import Image from "next/image";
import logoIcon from "@/public/assets/icons/logo.svg";
import { Button } from "@mui/material";
import otherlinks from "@/links/otherlinks";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import SessionContext from "@/components/contexts/SessionContext";
import onLogoutClick from "@/utils/onLogoutClick";
import { useRouter } from "next/router";
import Menu from "@/components/reusable/menu/Menu";
import userLinks from "@/links/userLinks";
import { Role, Service } from "@prisma/client";
import getAdminLinks from "@/links/getAdminLinks";
import LanguageSwitcher from "@/components/reusable/language-switcher/LanguageSwitcher";
import { useTranslation } from "next-i18next";
import useIsRtl from "@/components/hooks/useIsRtl";
import Links from "@/enums/Links";
import links from "@/links/links";
import RoleId from "@/enums/RoleId";

const LgHeader = ({ className, services }: { className: string; services?: Service[] }) => {
  const { t } = useTranslation("common");

  const pathname = usePathname();

  const { token, user } = useContext(SessionContext) || {};

  const router = useRouter();

  const isRtl = useIsRtl();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handlScroll = () => {
      if (window.scrollY >= 25) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener("scroll", handlScroll);

    return () => window.removeEventListener("scroll", handlScroll);
  }, []);

  return (
    <header className={classNames(className, { "bg-white": collapsed })}>
      <div className="container flex justify-between items-center py-13">
        <Link href="/">
          <Image src={logoIcon} alt="" className="w-66.5 h-auto" />
        </Link>

        <nav className="hidden lg:flex items-center">
          {services &&
            services.length !== 0 &&
            services.map(({ id, nameEn, nameAr }, index) => {
              const href = `/services/${id}`;

              const isCurrent = href === pathname;

              return (
                <Link
                  key={index}
                  href={`/services/${id}`}
                  className={classNames("ltr:mr-6 rtl:ml-6", {
                    "font-bold decoration-2 text-color-1": isCurrent,
                    "text-black": !isCurrent,
                  })}
                >
                  {isRtl ? nameAr : nameEn}
                </Link>
              );
            })}

          <Link
            href={links[Links.MyChartManagement].href}
            className={classNames("ltr:mr-6 rtl:ml-6", {
              "font-bold decoration-2 text-color-1":
                links[Links.MyChartManagement].href === pathname,
              "text-black": links[Links.MyChartManagement].href !== pathname,
            })}
          >
            {t("My Chart Management")}
          </Link>

          {otherlinks && otherlinks.length !== 0 && (
            <Menu
              id="other"
              label={t("Other")}
              items={otherlinks.map(({ label, href }, index) => {
                return {
                  content: (
                    <Link key={index} href={href}>
                      {t(label)}
                    </Link>
                  ),
                };
              })}
            ></Menu>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {!token && (
            <Link href="/login">
              <Button variant="contained">{t("Log in")}</Button>
            </Link>
          )}

          {token && user && (
            <Menu
              id="user-menu"
              label={user.firstName + " " + user.lastName}
              items={[
                ...(user.roleId === RoleId.Admin ? getAdminLinks(user.email) : userLinks).map(
                  ({ href, label }, index) => {
                    const isCurrent = href === pathname;

                    return {
                      content: (
                        <Link key={index} href={href}>
                          {t(label)}
                        </Link>
                      ),
                      selected: isCurrent,
                    };
                  }
                ),
                {
                  content: (
                    <Link key="Logout" href="" onClick={(e) => onLogoutClick(e, router)}>
                      {t("Log out")}
                    </Link>
                  ),
                },
              ]}
            ></Menu>
          )}

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default LgHeader;
