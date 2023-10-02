import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { User } from "@prisma/client";
import userService from "@/services/userService";
import DashboardInfoCard from "@/components/ui/dashboard-info-card/DashboardInfoCard";
import RevenueChartCard from "@/components/ui/revenue-chart-card/RevenueChartCard";
import UserLoginChartCard from "@/components/ui/user-login-chart-card/UserLoginChartCard";
import SalesByCountryCard from "@/components/ui/sales-by-country-card/SalesByCountryCard";
import SalesByAgeCard from "@/components/ui/sales-by-age-card/SalesByAgeCard";
import LastUsersCard from "@/components/ui/last-users-card/LastUsersCard";
import { useTranslation } from "next-i18next";
import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";

export default function Dashboards({ users }: { users: User[] }) {
  const { t } = useTranslation("common");

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">{t("Dashboards")}</h1>

      <div className="flex flex-col gap-12">
        <div className="flex gap-5">
          <DashboardInfoCard
            title="users’ traffic"
            fromDate="6 May"
            toDate="7 May"
            text1="3200"
            text2="+12%"
            className="flex-1"
          />

          <DashboardInfoCard
            title="Sales"
            fromDate="6 May"
            toDate="7 May"
            text1="$230,220"
            text2="+55%"
            className="flex-1"
          />

          <DashboardInfoCard
            title="Requests"
            fromDate="6 May"
            toDate="7 May"
            text1="1200"
            text2="213"
            className="flex-1"
          />
        </div>

        <div className="w-full flex justify-between gap-4">
          <RevenueChartCard />

          <UserLoginChartCard className="grow" />
        </div>

        <div className="w-full flex justify-between gap-4">
          <SalesByCountryCard className="flex-1" />

          <SalesByAgeCard className="flex-1" />
        </div>

        <LastUsersCard users={users} />
      </div>
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const res = await userService.admin.getAllUsers(token);
  const users = res.data.data;

  return {
    props: {
      session: req.session,
      users,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
