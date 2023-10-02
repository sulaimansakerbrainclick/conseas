import Interval from "@/enums/Interval";
import * as yup from "yup";

const chartSchema = yup.object().shape({
  nameEn: yup.string().required("Name is required"),
  nameAr: yup.string().required("Name is required"),
  priceUSD: yup
    .number()
    .required("Price (USD) is required")
    .min(1, "Price (USD) should be more than 0"),
  priceAED: yup
    .number()
    .required("Price (AED) is required")
    .min(1, "Price (AED) should be more than 0"),
  interval: yup.string().oneOf(Object.values(Interval)).required("Interval is required"),
  intervalCount: yup
    .number()
    .required("Interval Count is required")
    .min(1, "Interval Count should be more between 0")
    .max(12, "Interval Count must be less than or equal to 12"),
  descriptionEn: yup.string().required("Description is required"),
  descriptionAr: yup.string().required("Description is required"),
});

export default chartSchema;
