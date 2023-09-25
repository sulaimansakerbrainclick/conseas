import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import { Toolbar } from "@mui/material";
import otherlinks from "@/data/otherlinks";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logoIcon from "@/public/assets/icons/logo-white.svg";
import { Button } from "@mui/material";
import onLogoutClick from "@/utils/onLogoutClick";
import SessionContext from "@/components/contexts/SessionContext";
import { useRouter } from "next/router";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Role, Service } from "@prisma/client";
import userLinks from "@/data/userLinks";
import adminLinks from "@/data/adminLinks";
import { useTranslation } from "next-i18next";
import useIsRtl from "@/components/hooks/useIsRtl";
import LanguageSwitcher from "@/components/reusable/language-switcher/LanguageSwitcher";
import links from "@/data/links";
import Links from "@/enums/Links";

export default function MaxLgHeader({
  className,
  services,
}: {
  className: string;
  services?: Service[];
}) {
  const { t } = useTranslation("common");

  const isRtl = useIsRtl();

  const pathname = usePathname();

  const { token, user } = useContext(SessionContext) || {};

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <header className={className}>
      <nav className="bg-color-1">
        <Toolbar color="primary">
          <div className="flex justify-between w-full">
            <div>
              <Link href="/">
                <Image src={logoIcon} alt="" className="w-auto h-10" />
              </Link>
            </div>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon className="text-white" />
            </IconButton>
          </div>
        </Toolbar>
      </nav>

      <nav>
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              xs: {
                width: "70%",
              },
              sm: {
                width: "50%",
              },
            },
          }}
        >
          <Box onClick={handleDrawerToggle} className="p-8">
            <div className="mb-6 flex justify-center">
              <LanguageSwitcher />
            </div>

            <ListItem disablePadding>
              <ListItemButton className="text-center">
                <ListItemText
                  primary={
                    <Link
                      href={links[Links.MyChartManagement].href}
                      className={classNames("", {
                        "font-bold decoration-2 text-color-1":
                          links[Links.MyChartManagement].href === pathname,
                        "text-black": links[Links.MyChartManagement].href !== pathname,
                      })}
                    >
                      {t("My Chart Management")}
                    </Link>
                  }
                />
              </ListItemButton>
            </ListItem>

            <div className="">
              {services &&
                services.length !== 0 &&
                services.map(({ id, nameEn, nameAr }, index) => {
                  const href = `/services/${id}`;

                  const isCurrent = href === pathname;

                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton className="text-center">
                        <ListItemText
                          primary={
                            <Link
                              key={index}
                              href={href}
                              className={classNames("", {
                                "font-bold decoration-2 text-color-1": isCurrent,
                                "text-black": !isCurrent,
                              })}
                            >
                              {isRtl ? nameAr : nameEn}
                            </Link>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}

              {otherlinks.map(({ label, href }, index) => {
                const isCurrent = href === pathname;

                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton className="text-center">
                      <ListItemText
                        primary={
                          <Link
                            key={index}
                            href={href}
                            className={classNames("", {
                              "font-bold decoration-2 text-color-1": isCurrent,
                              "text-black": !isCurrent,
                            })}
                          >
                            {t(label)}
                          </Link>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </div>

            {user &&
              (user.role === Role.Admin ? adminLinks : userLinks).map(({ label, href }, index) => {
                const isCurrent = href === pathname;

                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton className="text-center">
                      <ListItemText
                        primary={
                          <Link
                            key={index}
                            href={href}
                            className={classNames("", {
                              "font-bold decoration-2 text-color-1": isCurrent,
                              "text-black": !isCurrent,
                            })}
                          >
                            {t(label)}
                          </Link>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}

            <div className="flex justify-center mt-4">
              {!token && (
                <Link href="/login" prefetch>
                  <Button variant="contained" endIcon={<AccountCircleRoundedIcon />}>
                    {t("Log in")}
                  </Button>
                </Link>
              )}

              {token && (
                <Button
                  variant="contained"
                  endIcon={<AccountCircleRoundedIcon />}
                  onClick={(e) => onLogoutClick(e, router)}
                >
                  {t("Log out")}
                </Button>
              )}
            </div>
          </Box>
        </Drawer>
      </nav>
    </header>
  );
}
