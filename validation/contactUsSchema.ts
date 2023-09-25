import phoneRegex from "@/regex/phoneRegex";
import * as yup from "yup";

const contactUsScheme = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Not a valid email").required("Email is required"),
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
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});

export default contactUsScheme;
