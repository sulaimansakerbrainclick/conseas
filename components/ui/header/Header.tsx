import { Service } from "@prisma/client";
import LgHeader from "../lg-header/LgHeader";
import MaxLgHeader from "../max-lg-header/MaxLgHeader";

const Header = ({ services }: { services?: Service[] }) => {
  return (
    <>
      <LgHeader className="max-lg:hidden" services={services} />

      <MaxLgHeader className="lg:hidden" services={services} />
    </>
  );
};

export default Header;
