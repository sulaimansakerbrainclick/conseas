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
    textEn: `
    <p style="text-align:start;"></p>
    <p style="margin-left:0in;"><span style="color: rgb(0,0,0);font-size: 18pt;font-family: Times New Roman", serif;"><strong>Welcome to Conseas Health</strong></span><span style="color: rgb(0,0,0);"><strong> </strong></span><span style="color: rgb(0,0,0);font-size: 18pt;font-family: Times New Roman", serif;"><strong>Care Coordination</strong></span><span style="color: rgb(0,0,0);"><strong> </strong></span></p>
    <p style="margin-left:0in;"><span style="color: rgb(0,0,0);font-size: 13.5pt;font-family: Roboto;">Conseas Health aims to facilitate access to medical</span><span style="color: rgb(0,0,0);"> </span><span style="color: rgb(0,0,0);font-size: 13.5pt;font-family: Roboto;">consultation</span><span style="color: rgb(0,0,0);"> </span><span style="color: rgb(0,0,0);font-size: 13.5pt;font-family: Roboto;">services in the United States for</span><span style="color: rgb(0,0,0);"> </span><span style="color: rgb(0,0,0);font-size: 13.5pt;font-family: Roboto;">clients. The project will serve as a bridge connecting</span><span style="color: rgb(0,0,0);"> </span><span style="color: rgb(0,0,0);font-size: 13.5pt;font-family: Roboto;">clients</span><span style="color: rgb(0,0,0);"> </span><span style="color: rgb(0,0,0);font-size: 13.5pt;font-family: Roboto;">with healthcare providers in the U.S. Clients will be able to receive written consultations and access other services through the platform. The platform will provide a convenient and secure way for</span><span style="color: rgb(0,0,0);"> </span><span style="color: rgb(0,0,0);font-size: 13.5pt;font-family: Roboto;">clients</span><span style="color: rgb(0,0,0);"> </span><span style="color: rgb(0,0,0);font-size: 13.5pt;font-family: Roboto;">to connect with healthcare providers working in top rated academic health institutions in the U.S.A.</span><span style="color: rgb(0,0,0);"> </span></p>
    <p style="text-align:start;"></p>
    <p style="margin-left:0in;"><span style="font-size: 13.5pt;font-family: Roboto;">CONSEAS offers a comprehensive range of healthcare coordination services, including helping with clients with managing electronic medical records, imaging consultation and experts second opinion.</span>  <span style="font-size: 13.5pt;font-family: Roboto;">including diagnostics, consultations, treatments, and rehabilitation.</span> <span style="font-size: 13.5pt;font-family: Roboto;">Whether you need routine check-ups, specialized care, or follow-up support, CONSEAS has you covered. With the convenience of telemedicine, you can access these services from the comfort of your home or wherever you are, saving you time and minimizing the hassle of uncertainty.</span></p>
    `,
    textAr: "",
  },
];

export default pagesData;
