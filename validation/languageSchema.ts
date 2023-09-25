import * as yup from "yup";

const languageSchema = yup.object().shape({
  key: yup.string().required("Language is required"),
});

export default languageSchema;
