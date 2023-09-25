import PageId from "../enums/PageId";

import telemedicinePolicyData from "../seed-data/telemedicinePolicyData";
import termsAndConditionsData from "../seed-data/termsAndConditionsData";

const pagesData = [
  {
    id: PageId.PrivacyAndPolicy,
    nameEn: "Privacy And Policy",
    nameAr: "الخصوصية والسياسة",
    textEn: "",
    textAr: "",
  },
  {
    id: PageId.TermsAndConditions,
    nameEn: "Terms And Conditions",
    nameAr: "الأحكام والشروط",
    ...termsAndConditionsData,
  },
  {
    id: PageId.Help,
    nameEn: "Help",
    nameAr: "مساعدة",
    textEn: "",
    textAr: "",
  },
  {
    id: PageId.TelemedicinePolicy,
    nameEn: "Telemedicine Policy",
    nameAr: "سياسة التطبيب عن بعد",
    ...telemedicinePolicyData,
  },
  {
    id: PageId.AboutUs,
    nameEn: "About Us",
    nameAr: "معلومات عنا",
    textEn: "",
    textAr: "",
  },
];

export default pagesData;
