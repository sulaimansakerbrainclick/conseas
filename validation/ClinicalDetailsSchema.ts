import phoneRegex from "@/regex/phoneRegex";
import * as yup from "yup";

const ClinicalDetailsSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  dateOfBirth: yup.date().required("Date of birth is required"),
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
  gender: yup.string().required("Gender is required"),
  medicalInformation: yup.string().required("Medical Information is required"),
  email: yup.string().email("Not a valid email").required("Email is required"),
});

export default ClinicalDetailsSchema;
