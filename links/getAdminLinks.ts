import Links from "../enums/Links";
import links from "./links";

const getAdminLinks = (adminEmail: string) => {
  const adminLinks = [
    links[Links.AdminProfile],
    // links[Links.AdminDashboards],
    links[Links.AdminUsers],
    links[Links.AdminDoctors],
    links[Links.AdminServices],
    links[Links.AdminTestimonial],
    links[Links.AdminRequests],
    links[Links.AdminAppSettings],
    links[Links.AdminAppSections],
    links[Links.AdminCharts],
    links[Links.AdminPrivacy],
    links[Links.AdminTerms],
    links[Links.AdminTelemedicinePolicy],
    links[Links.AdminAboutUs],
    links[Links.UserChangePassword],
  ];

  if (adminEmail === "ceo@conseashealth.com") {
    adminLinks.push(links[Links.ManageAdmins]);
  }

  return adminLinks;
};

export default getAdminLinks;
