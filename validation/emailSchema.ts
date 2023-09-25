import * as yup from "yup";

const emailSchema = yup.object().shape({
  email: yup.string().email("Not a valid email").required("Email is required"),
});

export default emailSchema;
