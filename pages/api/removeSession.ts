import { sessionOptions } from "@/lib/session";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

async function removeSession(req: NextApiRequest, res: NextApiResponse) {
  try {
    req.session.destroy();
    res.send({ ok: true });
  } catch (e) {
    getEnhancedRes(res, 400, String(e));
  }
}

export default withIronSessionApiRoute(removeSession, sessionOptions);
