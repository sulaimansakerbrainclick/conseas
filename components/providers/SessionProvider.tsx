import { IronSessionData } from "iron-session";
import SessionContext from "../contexts/SessionContext";

const SessionProvider = ({
  session,
  children,
}: {
  session: IronSessionData;
  children: React.ReactNode;
}) => {
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
