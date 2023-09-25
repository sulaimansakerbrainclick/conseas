import * as yup from "yup";

const phoneVerifySchema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be 6 digits")
    .max(6, "Must be 6 digits"),
});

export default phoneVerifySchema;
