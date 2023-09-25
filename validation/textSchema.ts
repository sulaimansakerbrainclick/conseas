import * as yup from "yup";

const textSchema = yup.object().shape({
  text: yup.string().required("Text is required"),
});

export default textSchema;
