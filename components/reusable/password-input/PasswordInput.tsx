import React, { useCallback, useState } from "react";
import { useTranslation } from "next-i18next";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordInput = ({
  value,
  onChange,
  onBlur,
  error,
  className,
  helperText,
  isConfirm,
  label,
  ...props
}: any) => {
  const { t } = useTranslation("common");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);

  return (
    <TextField
      name={isConfirm ? "confirmPassword" : "password"}
      id={isConfirm ? "confirmPassword" : "password"}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      label={`${label ? label : isConfirm ? t("Confirm password") : t("Password")}*`}
      variant="outlined"
      className={className}
      type={showPassword ? "text" : "password"}
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff color="primary" /> : <Visibility color="primary" />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default PasswordInput;
