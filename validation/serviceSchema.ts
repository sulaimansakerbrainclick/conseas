import * as yup from "yup";

const serviceSchema = yup.object().shape({
  nameEn: yup.string().required("Name is required"),
  nameAr: yup.string().required("Name is required"),
  descriptionEn: yup.string().required("Description is required"),
  descriptionAr: yup.string().required("Description is required"),
  shortDescriptionEn: yup.string().required("Short Description is required"),
  shortDescriptionAr: yup.string().required("Short Description is required"),
  price: yup.number().required("Description is required"),
});

export default serviceSchema;
