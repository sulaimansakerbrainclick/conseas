import { User } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";

export async function sign(payload: any, secret: string): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(process.env.TOEKN_EXPIRE_TIME as string)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function verify(token: string, secret: string): Promise<User> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  return payload as User;
}

export function generateAuthToken(payload: any) {
  const secret_key = process.env.JWT_SECRET_KEY;
  const token = sign(payload, secret_key!);
  return token;
}

export async function decodeToken(authorization: string) {
  const token = authorization.split(" ")[1];

  try {
    const secret_key = process.env.JWT_SECRET_KEY;
    const decoded = await verify(token, secret_key!);
    return decoded;
  } catch (error) {
    return null;
  }
}
