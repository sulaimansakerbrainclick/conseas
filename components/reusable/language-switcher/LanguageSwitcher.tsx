import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "@mui/material";

const LanguageSwitcher = ({ className }: any) => {
  const router = useRouter();

  const { locale, locales, asPath } = router;

  const unselectedLocals = locales?.filter((l) => l !== locale) || [];

  const firstLocal = unselectedLocals[0];

  const onClick = () => {
    window.location.href = `/${firstLocal}/${asPath}`;
  };

  return (
    <Button variant="contained" onClick={onClick} className={classNames(className)}>
      {firstLocal === "ar" ? "عربي" : "English"}
    </Button>
  );
};

export default LanguageSwitcher;
