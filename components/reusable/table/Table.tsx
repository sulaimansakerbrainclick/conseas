import React from "react";
import styles from "./Table.module.scss";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

export interface Column {
  field: string;
  headerName: string;
  render: (item: any) => React.ReactNode;
}

interface Props {
  columns: Column[];
  data: any;
  result?: any[];
  className?: string;
}

const Table = ({ columns, data, result, className }: Props) => {
  const { t } = useTranslation("common");

  return (
    <table className={classNames("table-fixed", styles.table, className)}>
      <thead className="ltr:text-left rtl:text-right">
        <tr>
          {columns.map(({ field, headerName }: any) => (
            <th key={field}>{t(headerName)}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item: any) => (
          <tr key={item.id}>
            {columns.map(({ field, render }) => (
              <td key={field}>{render(item)}</td>
            ))}
          </tr>
        ))}

        {result && (
          <tr className="border-t">
            {result.map(({ id, content }: any) => (
              <td key={id} className="text-color-1 text-xl font-bold">
                {content}
              </td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
