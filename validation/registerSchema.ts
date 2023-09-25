import * as yup from "yup";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Not a valid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .test("test-phone", "Enter a valid phone", function (value) {
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      let isValidPhone = phoneRegex.test(value);
      if (!isValidPhone) {
        return false;
      }
      return true;
    }),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "The password is too short")
    .max(60, "The password is too long"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is Required")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
  isTermsAccepted: yup.bool().oneOf([true], "you must accept the Terms or Conditions"),
});

export default registerSchema;
