import * as yup from "yup";

const submitConsultSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Not a valid email").required("Email is required"),
  appointmentTypeId: yup.string().required("Appointment Type is required"),
});

export default submitConsultSchema;
