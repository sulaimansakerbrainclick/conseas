import { IronSessionData } from "iron-session";
import { createContext } from "react";

const SessionContext = createContext<IronSessionData | null>(null);

export default SessionContext;
