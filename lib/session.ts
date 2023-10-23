// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD as string,
  cookieName: "conseas",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: Number(process.env.TOEKN_EXPIRE_TIME_IN_SECONDS),
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    token: string;
    user: {
      id: string;
      image: string;
      firstName: string;
      lastName: string;
      roleId: string;
      email: string;
    };
  }
}
