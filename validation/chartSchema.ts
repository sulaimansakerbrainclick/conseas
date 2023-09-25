import Interval from "@/enums/Interval";
import * as yup from "yup";

const chartSchema = yup.object().shape({
  nameEn: yup.string().required("Name is required"),
  nameAr: yup.string().required("Name is required"),
  price: yup.number().required("Price is required"),
  interval: yup.string().oneOf(Object.values(Interval)).required("Interval is required"),
  intervalCount: yup
    .number()
    .required("Interval Count is required")
    .max(12, "interval Count must be less than or equal to 12"),
  descriptionEn: yup.string().required("Description is required"),
  descriptionAr: yup.string().required("Description is required"),
});

export default chartSchema;
