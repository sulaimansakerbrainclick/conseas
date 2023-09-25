import classNames from "classnames";
import CustomLink, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface Props extends LinkProps {
  variant?: "contained";
  className?: string;
  children: ReactNode;
}

const Link = ({ className, variant, children, ...props }: Props) => {
  return (
    <CustomLink
      className={classNames(className, {
        "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-j6wg5q-MuiButtonBase-root-MuiButton-root":
          variant === "contained",
      })}
      {...props}
    >
      {children}
    </CustomLink>
  );
};

export default Link;
