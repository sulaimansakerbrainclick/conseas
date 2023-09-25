import SessionContext from "@/components/contexts/SessionContext";
import AppSectionForm, {
  SectionFormValues,
} from "@/components/forms/app-section-form/AppSectionForm";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import Header from "@/components/ui/header/Header";
import { sessionOptions } from "@/lib/session";
import sectionService from "@/services/sectionService";
import showSuccessToast from "@/utils/showSuccessToast";
import { Section, SectionItem } from "@prisma/client";
import { FormikHelpers } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext } from "react";
import _ from "lodash";
import sectionsData from "@/seed-data/sectionsData";
import SectionId from "@/enums/SectionId";
import fileService from "@/services/fileService";

export default function AppSections({
  sections,
}: {
  sections: (Section & { list: SectionItem[] })[];
}) {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const handleSubmit = async (
    id: string,
    values: SectionFormValues,
    { setSubmitting }: FormikHelpers<SectionFormValues>
  ) => {
    const promises = values.list.map(async (item) => {
      if (item.imageFile) {
        const uploadRes = await fileService.upload(item.imageFile, token);

        return uploadRes.data.data;
      }

      return item.image;
    });

    const images = await Promise.all(promises);

    const newValues = {
      ...values,
      list: values.list.map(({ imageFile, ...value }, index) => ({
        ...value,
        image: images[index],
      })),
    };

    try {
      const res = await sectionService.updateSection(id, newValues, token);
      showSuccessToast(res.data.message);
    } catch (e) {}
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">{t("App Sections")}</h1>

      {sections.map((section) => (
        <div key={section.id} className="mb-12">
          <AppSectionForm
            hasListTitle={sectionsData[section.id as SectionId].hasListTitle}
            hasListText={sectionsData[section.id as SectionId].hasListText}
            onSubmit={(...args) => handleSubmit(section.id, ...args)}
            initialValues={{
              id: section.id as SectionId,
              ..._.pick(section, ["titleEn", "titleAr", "textEn", "textAr"]),
              list: section.list.map(({ id, titleEn, titleAr, textEn, textAr, image }) => ({
                id,
                titleEn,
                titleAr,
                textEn,
                textAr,
                image,
              })),
            }}
          />
        </div>
      ))}
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const res = await sectionService.getSections();
  const sections = res.data.data;

  return {
    props: {
      session: req.session,
      sections,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
