import * as yup from "yup";

const testimonialSchema = yup.object().shape({
  nameEn: yup.string().required("Name is required"),
  nameAr: yup.string().required("Name is required"),
  textEn: yup.string().required("Name is required"),
  textAr: yup.string().required("Name is required"),
});

export default testimonialSchema;
