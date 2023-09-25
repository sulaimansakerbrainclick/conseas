import * as yup from "yup";

const translatedTextSchema = yup.object().shape({
  textEn: yup.string().required("Text is required"),
  textAr: yup.string().required("Text is required"),
});

export default translatedTextSchema;
