import React, { useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FormHelperText from "@mui/material/FormHelperText";
import Link from "next/link";
import { Button } from "@mui/material";
import { useTranslation } from "next-i18next";

const UploadButton = ({
  children,
  fileUrl,
  error,
  accept,
  helperText,
  onChange: doChange,
  disabled,
}: any) => {
  const { t } = useTranslation("common");

  const uploadRef = useRef<any>();

  const [fileName, setFileName] = useState("");

  const handleUploadClick = () => {
    uploadRef.current.click();
  };

  const handleChange = (e: any) => {
    const { files } = e.target;

    doChange(files[0]);
    setFileName(files[0].name);
  };

  return (
    <div>
      <div className="flex items-center">
        {!fileUrl && (
          <Button type="button" onClick={handleUploadClick} variant="contained" disabled={disabled}>
            <div className="flex justify-between items-center">
              <FileUploadIcon className="rtl:ml-2 ltr:mr-2" />

              <div>{fileName ? fileName : children}</div>
            </div>
          </Button>
        )}

        {fileUrl && (
          <Link href={fileUrl} target="_blank" rel="noreferrer" className="text-color-1">
            {t("Download")}
          </Link>
        )}
      </div>

      {error && (
        <FormHelperText error className="mt-2">
          {helperText}
        </FormHelperText>
      )}

      <input
        hidden
        multiple
        type="file"
        ref={uploadRef}
        accept={accept || "application/pdf"}
        name="imagesUpload"
        onChange={handleChange}
        onClick={(event: any) => {
          event.target.value = null;
        }}
      />
    </div>
  );
};

export default UploadButton;
