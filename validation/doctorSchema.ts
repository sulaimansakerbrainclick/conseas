import phoneRegex from "@/regex/phoneRegex";
import * as yup from "yup";

const doctorSchema = yup.object().shape({
  firstNameEn: yup.string().required("First Name is required"),
  lastNameEn: yup.string().required("Last Name is required"),
  firstNameAr: yup.string().required("First Name is required"),
  lastNameAr: yup.string().required("Last Name is required"),
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
  email: yup.string().email("Not a valid email").required("Email is required"),
  location: yup.string().nullable(),
  specializationEn: yup.string().required("Specialization is required"),
  specializationAr: yup.string().required("Specialization is required"),
  yearsOfExperience: yup.number().nullable(),
  graduationDate: yup.date().nullable(),
  workplace: yup.string().nullable(),
  country: yup.string().nullable(),
  city: yup.string().nullable(),
});

export default doctorSchema;
