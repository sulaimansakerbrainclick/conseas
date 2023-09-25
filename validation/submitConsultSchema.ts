import * as yup from "yup";

const submitConsultSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phone: yup.string().required("Phone number is required"),
});

export default submitConsultSchema;
