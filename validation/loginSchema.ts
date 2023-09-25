import emailRegex from "@/regex/emailRegex";
import phoneRegex from "@/regex/phoneRegex";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  emailOrPhone: yup
    .string()
    .required("Email Or Phone is required")
    .test("test-name", "Enter a valid phone/email", function (value) {
      let isValidEmail = emailRegex.test(value);
      let isValidPhone = phoneRegex.test(value);
      if (!isValidEmail && !isValidPhone) {
        return false;
      }
      return true;
    }),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "The password is too short")
    .max(60, "The password is too long"),
});

export default loginSchema;
