import phoneRegex from "@/regex/phoneRegex";
import * as yup from "yup";

const adminSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .test("test-name", "Enter a valid phone number", function (value) {
      let isValidPhone = phoneRegex.test(value);
      if (!isValidPhone) {
        return false;
      }
      return true;
    }),
  email: yup.string().email("Not a valid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "The password is too short")
    .max(60, "The password is too long"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is Required")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

export default adminSchema;
