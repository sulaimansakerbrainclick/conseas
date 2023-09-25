import phoneRegex from "@/regex/phoneRegex";
import * as yup from "yup";

const appSettingsSchema = yup.object().shape({
  heroTitleEn: yup.string().required("Hero Title is required"),
  heroTitleAr: yup.string().required("Hero Title is required"),
  heroSubTitleEn: yup.string().required("Hero Subtitle is required"),
  heroSubTitleAr: yup.string().required("Hero Subtitle is required"),

  shortDescritionEn: yup.string().required("Short Descrition is required"),
  shortDescritionAr: yup.string().required("Short Descrition is required"),

  facebookLink: yup.string().required("Facebook Link is required"),
  twitterLink: yup.string().required("Twitter Link is required"),
  instagramLink: yup.string().required("Instagram Link is required"),
  linkedinLink: yup.string().required("Linkedin Link is required"),

  addressEn: yup.string().required("Address is required"),
  addressAr: yup.string().required("Address is required"),

  callUs: yup
    .string()
    .required("Call Us is required")
    .test("test-name", "Enter a valid phone number", function (value) {
      let isValidPhone = phoneRegex.test(value);
      if (!isValidPhone) {
        return false;
      }
      return true;
    }),

  whatsapp: yup
    .string()
    .required("Whatsapp is required")
    .test("test-name", "Enter a valid phone number", function (value) {
      let isValidPhone = phoneRegex.test(value);
      if (!isValidPhone) {
        return false;
      }
      return true;
    }),

  email: yup.string().email("Not a valid email").required("Email is required"),
});

export default appSettingsSchema;
