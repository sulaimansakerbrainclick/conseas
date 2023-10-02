import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./lib/jwt";
import getMiddlewareRes from "./utils/getMiddlewareRes";

import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "./lib/session";
import RoleId from "./enums/RoleId";

const getIsAdminRoute = (pathname: string) => {
  return pathname.includes("admin");
};

const getIsApiRoute = (pathname: string) => {
  return pathname.includes("api");
};

const getIsFileRoute = (pathname: string) => {
  return pathname.includes("files");
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  //files
  if (getIsFileRoute(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/api" + url.pathname;
    return NextResponse.rewrite(url);
  }

  // apis
  if (getIsApiRoute(pathname)) {
    const authorization = req.headers.get("Authorization");

    if (!authorization) {
      return getMiddlewareRes(401, "Access denied. No token provided");
    }

    const decoded = await decodeToken(authorization as string);
    if (!decoded) {
      return getMiddlewareRes(498, "Invalid token");
    }

    const isAdminRoute = getIsAdminRoute(pathname);
    if (isAdminRoute && decoded.roleId !== RoleId.Admin) {
      return getMiddlewareRes(401, "Access denied");
    }

    return NextResponse.next();
  }

  // pages
  const res = NextResponse.next();
  const { token } = await getIronSession(req, res, sessionOptions);

  if (!token) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  const decoded = await decodeToken(token as string);
  if (!decoded) {
    return NextResponse.redirect(new URL("/login-expired", req.url));
  }

  const isAdminRoute = getIsAdminRoute(pathname);
  if (isAdminRoute && decoded.roleId !== RoleId.Admin) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/files/:path*",
    "/user/:path*",
    "/admin/:path*",
    "/api/user/:path*",
    "/api/admin/:path*",
  ],
};
