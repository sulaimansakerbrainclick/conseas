import phoneRegex from "@/regex/phoneRegex";
import * as yup from "yup";

const phoneForgetPasswordSchema = yup.object().shape({
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
});

export default phoneForgetPasswordSchema;
