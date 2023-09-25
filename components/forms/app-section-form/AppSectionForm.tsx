import React from "react";
import { IconButton, TextField } from "@mui/material";
import { Formik, FormikErrors, FormikHelpers, FormikTouched } from "formik";
import { useTranslation } from "next-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import appSectionSchema from "@/validation/appSectionSchema";
import UploadImage from "@/components/reusable/upload-image/UploadImage";
import defaultProfileImage from "@/public/assets/images/default-profile-image.svg";
import sectionsData from "@/seed-data/sectionsData";
import SectionId from "@/enums/SectionId";

interface ListItem {
  id: string;
  titleEn?: string | null;
  titleAr?: string | null;
  textEn?: string | null;
  textAr?: string | null;
  image?: string | null;
  imageFile?: File;
}

export interface SectionFormValues {
  id: SectionId;
  titleEn: string;
  titleAr: string;
  textEn: string;
  textAr: string;
  list: ListItem[];
}

const newListItem: ListItem = {
  id: "new",
  titleEn: "",
  titleAr: "",
  textEn: "",
  textAr: "",
  image: "",
};

const AppSectionForm = ({
  onSubmit,
  initialValues,
  hasListTitle,
  hasListText,
}: {
  hasListTitle: boolean;
  hasListText: boolean;
  initialValues: SectionFormValues;
  onSubmit: (values: SectionFormValues, formikHelpers: FormikHelpers<SectionFormValues>) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={appSectionSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="font-medium text-lg capitalize">
              {t(`${sectionsData[values.id].label} section`)}
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
              <TextField
                name="titleEn"
                value={values.titleEn}
                onChange={(e) => setFieldValue("titleEn", e.target.value)}
                onBlur={handleBlur}
                label={t("Title (En)*")}
                variant="outlined"
                error={touched.titleEn && !!errors.titleEn}
                helperText={touched.titleEn && errors.titleEn}
                size="small"
              />

              <TextField
                name="titleAr"
                value={values.titleAr}
                onChange={(e) => setFieldValue("titleAr", e.target.value)}
                onBlur={handleBlur}
                label={t("Title (Ar)*")}
                variant="outlined"
                error={touched.titleAr && !!errors.titleAr}
                helperText={touched.titleAr && errors.titleAr}
                size="small"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
              <TextField
                name="textEn"
                value={values.textEn}
                onChange={(e) => setFieldValue("textEn", e.target.value)}
                onBlur={handleBlur}
                label={t("Text (En)*")}
                variant="outlined"
                error={touched.textEn && !!errors.textEn}
                helperText={touched.textEn && errors.textEn}
                size="small"
              />

              <TextField
                name="textAr"
                value={values.textAr}
                onChange={(e) => setFieldValue("textAr", e.target.value)}
                onBlur={handleBlur}
                label={t("Text (Ar)*")}
                variant="outlined"
                error={touched.textAr && !!errors.textAr}
                helperText={touched.textAr && errors.textAr}
                size="small"
              />
            </div>

            <div className="font-medium text-sm">{t("List")}</div>

            {values.list &&
              values.list.map((item, index) => {
                const itemTouched: FormikTouched<ListItem> | undefined =
                  touched.list && touched.list[index];

                const itemErrors: FormikErrors<ListItem> | string | undefined =
                  errors.list && errors.list[index];

                return (
                  <div key={index}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-sm">#{index}</div>

                      <IconButton
                        className="p-0"
                        onClick={() =>
                          setFieldValue(
                            `list`,
                            values.list.slice(0, index).concat(values.list.slice(index + 1))
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>

                    <div className="flex flex-col gap-3">
                      {hasListTitle && (
                        <div className="flex flex-col lg:flex-row gap-5">
                          <TextField
                            name="titleEn"
                            value={item.titleEn}
                            onChange={(e) =>
                              setFieldValue(`list[${index}].titleEn`, e.target.value)
                            }
                            onBlur={handleBlur}
                            label={t("Title (En)*")}
                            variant="outlined"
                            error={
                              itemTouched &&
                              itemTouched.titleEn &&
                              typeof itemErrors !== "string" &&
                              !!itemErrors &&
                              !!itemErrors.titleEn
                            }
                            helperText={
                              itemTouched &&
                              itemTouched.titleEn &&
                              typeof itemErrors !== "string" &&
                              !!itemErrors &&
                              itemErrors.titleEn
                            }
                            size="small"
                          />

                          <TextField
                            name="titleAr"
                            value={item.titleAr}
                            onChange={(e) =>
                              setFieldValue(`list[${index}].titleAr`, e.target.value)
                            }
                            onBlur={handleBlur}
                            label={t("Title (Ar)*")}
                            variant="outlined"
                            error={
                              itemTouched &&
                              itemTouched.titleAr &&
                              typeof itemErrors !== "string" &&
                              !!itemErrors &&
                              !!itemErrors.titleAr
                            }
                            helperText={
                              itemTouched &&
                              itemTouched.titleAr &&
                              typeof itemErrors !== "string" &&
                              !!itemErrors &&
                              itemErrors.titleAr
                            }
                            size="small"
                          />
                        </div>
                      )}

                      {hasListText && (
                        <div className="flex flex-col lg:flex-row gap-5">
                          <TextField
                            name="textEn"
                            value={item.textEn}
                            onChange={(e) => setFieldValue(`list[${index}].textEn`, e.target.value)}
                            onBlur={handleBlur}
                            label={t("Text (En)*")}
                            variant="outlined"
                            error={
                              itemTouched &&
                              itemTouched.textEn &&
                              typeof itemErrors !== "string" &&
                              !!itemErrors &&
                              !!itemErrors.textEn
                            }
                            helperText={
                              itemTouched &&
                              itemTouched.textEn &&
                              typeof itemErrors !== "string" &&
                              !!itemErrors &&
                              itemErrors.textEn
                            }
                            size="small"
                          />

                          <TextField
                            name="textAr"
                            value={item.textAr}
                            onChange={(e) => setFieldValue(`list[${index}].textAr`, e.target.value)}
                            onBlur={handleBlur}
                            label={t("Text (Ar)*")}
                            variant="outlined"
                            error={
                              itemTouched &&
                              itemTouched.textAr &&
                              typeof itemErrors !== "string" &&
                              !!itemErrors &&
                              !!itemErrors.textAr
                            }
                            helperText={
                              itemTouched &&
                              itemTouched.textAr &&
                              typeof itemErrors !== "string" &&
                              !!itemErrors &&
                              itemErrors.textAr
                            }
                            size="small"
                          />
                        </div>
                      )}

                      <UploadImage
                        label="Upload Picture"
                        image={item.image}
                        onChange={(imageFile) => {
                          setFieldValue(`list[${index}].imageFile`, imageFile);
                        }}
                        defaultImage={defaultProfileImage}
                        error={
                          itemTouched &&
                          itemTouched.image &&
                          typeof itemErrors !== "string" &&
                          !!itemErrors &&
                          !!itemErrors.image
                        }
                        helperText={
                          itemTouched &&
                          itemTouched.image &&
                          typeof itemErrors !== "string" &&
                          !!itemErrors &&
                          itemErrors.image
                        }
                      />
                    </div>
                  </div>
                );
              })}

            <div>
              <IconButton
                aria-label="add"
                onClick={() => setFieldValue(`list`, [...values.list, { ...newListItem }])}
              >
                <AddIcon />
              </IconButton>
            </div>

            <div>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {t("Save")}
              </LoadingButton>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default AppSectionForm;
