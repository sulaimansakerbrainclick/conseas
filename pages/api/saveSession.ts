import { sessionOptions } from "@/lib/session";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

async function saveSession(req: NextApiRequest, res: NextApiResponse) {
  const session = await req.body;

  req.session = session;

  req.session.token = session.token;
  req.session.user = {
    id: session.user.id,
    image: session.user.image,
    firstName: session.user.firstName,
    lastName: session.user.lastName,
    roleId: session.user.roleId,
    email: session.user.email,
  };

  try {
    await req.session.save();
    getEnhancedRes(res, 200, "Session saved successfully");
  } catch (e) {
    getEnhancedRes(res, 400, String(e));
  }
}

export default withIronSessionApiRoute(saveSession, sessionOptions);
