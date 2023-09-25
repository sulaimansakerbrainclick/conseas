import * as yup from "yup";

const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Password is required")
    .min(6, "The password is too short")
    .max(60, "The password is too long"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is Required")
    .oneOf([yup.ref("newPassword"), ""], "Passwords must match"),
});

export default resetPasswordSchema;
