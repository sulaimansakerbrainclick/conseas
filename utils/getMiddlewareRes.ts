import { NextResponse } from "next/server";

const getMiddlewareRes = (status: number, message: string, data: any = {}) => {
  return new NextResponse(JSON.stringify({ message, data }), {
    status,
    headers: { "content-type": "application/json" },
  });
};

export default getMiddlewareRes;
