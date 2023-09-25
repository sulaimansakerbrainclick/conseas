import React from "react";

import styles from "./AppTemplate.module.scss";

const AppTemplate = ({ header, hero, children, footer }: any) => {
  return (
    <div className={styles.template}>
      {header && <div className={styles.header}>{header}</div>}
      {hero && <div className="shadow-lg mb-16 lg:mb-12">{hero}</div>}
      {children && <div className="relative">{children}</div>}
      {footer && <div>{footer}</div>}
    </div>
  );
};

export default AppTemplate;
