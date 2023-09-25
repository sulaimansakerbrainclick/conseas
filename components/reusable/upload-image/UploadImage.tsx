import React, { useRef, useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import Image from "next/image";
import { Button } from "@mui/material";
import classNames from "classnames";

interface Props {
  label: string;
  error?: boolean;
  image?: string | null;
  helperText?: React.ReactNode;
  defaultImage?: any;
  onChange: (file: File) => void;
  imageClassName?: string;
}
const UploadImage = ({
  label,
  error,
  image,
  helperText,
  onChange: doChange,
  defaultImage,
  imageClassName,
}: Props) => {
  const [imageBase64, setImageBase64] = useState<string>();

  const uploadRef = useRef<any>();

  const handleUploadClick = () => {
    uploadRef.current.click();
  };

  const handleChange = (e: any) => {
    const { files } = e.target;

    const reader = new FileReader();

    reader.onload = () => {
      const imageBase64 = reader.result as string;

      setImageBase64(imageBase64);
      doChange(files[0]);
    };

    reader.readAsDataURL(files[0]);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
      <div className="relative w-26 h-26">
        <Image
          src={imageBase64 || image || defaultImage}
          alt=""
          fill
          className={classNames("rounded-full object-contain", imageClassName)}
          sizes="100w"
        />
      </div>

      <Button variant="contained" onClick={handleUploadClick}>
        {label}
      </Button>

      {error && <FormHelperText error>{helperText}</FormHelperText>}

      <input
        hidden
        multiple
        type="file"
        ref={uploadRef}
        accept="image/*"
        name="imagesUpload"
        onChange={handleChange}
        onClick={(event: any) => {
          event.target.value = null;
        }}
      />
    </div>
  );
};

export default UploadImage;
