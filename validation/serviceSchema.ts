import * as yup from "yup";

const serviceSchema = yup.object().shape({
  nameEn: yup.string().required("Name is required"),
  nameAr: yup.string().required("Name is required"),
  descriptionEn: yup.string().required("Description is required"),
  descriptionAr: yup.string().required("Description is required"),
  shortDescriptionEn: yup.string().required("Short Description is required"),
  shortDescriptionAr: yup.string().required("Short Description is required"),
  priceUSD: yup
    .number()
    .required("Price (USD) is required")
    .min(1, "Price (USD) should be more than 0"),
  priceAED: yup
    .number()
    .required("Price (AED) is required")
    .min(1, "Price (AED) should be more than 0"),
});

export default serviceSchema;
