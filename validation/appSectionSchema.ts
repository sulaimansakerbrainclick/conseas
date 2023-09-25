import * as yup from "yup";

const appSectionSchema = yup.object().shape({
  id: yup.string().required("Id is required"),
  titleEn: yup.string().required("Title (En) is required"),
  titleAr: yup.string().required("Title (Ar) is required"),
  textEn: yup.string().required("Text (En) is required"),
  textAr: yup.string().required("Text (Ar) is required"),

  list: yup
    .array()
    .default(() => [{}])
    .of(
      yup
        .object()
        .required()
        .shape({
          id: yup.string().required("Id is required"),
          titleEn: yup.string().nullable(),
          titleAr: yup.string().nullable(),
          textEn: yup.string().nullable(),
          textAr: yup.string().nullable(),
        })
    ),
});

export default appSectionSchema;
