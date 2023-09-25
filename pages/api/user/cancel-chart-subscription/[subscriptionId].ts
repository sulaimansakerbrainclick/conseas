import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";
import { decodeToken } from "@/lib/jwt";
import links from "@/data/links";
import Links from "@/enums/Links";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, query, headers } = req;

  if (method === "POST") {
    const { authorization } = headers;

    const decoded = await decodeToken(authorization as string);
    if (!decoded) return getEnhancedRes(res, 498, "Invalid token");

    let user = await prisma.user.findFirst({
      where: {
        id: decoded.id as string,
        deletedAt: null,
      },
    });

    if (!user) {
      return getEnhancedRes(res, 400, "Invalid user");
    }

    if (!user.stripeCustomerId) {
      return getEnhancedRes(res, 400, "Invalid Customer");
    }

    const configuration = await stripe.billingPortal.configurations.create({
      features: {
        subscription_cancel: {
          enabled: true,
          mode: "immediately",
        },
      },
      business_profile: {
        privacy_policy_url: `${process.env.NEXT_PUBLIC_APP_URL}${
          links[Links.PrivacyAndPolicy].href
        }`,
        terms_of_service_url: `${process.env.NEXT_PUBLIC_APP_URL}${
          links[Links.TermsAndConditions].href
        }`,
      },
    });

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}${links[Links.UserChart].href}`,
      configuration: configuration.id,
      flow_data: {
        type: "subscription_cancel",
        subscription_cancel: {
          subscription: query.subscriptionId as string,
        },
        after_completion: {
          type: "redirect",
          redirect: {
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}${
              links[Links.SubscriptionCanceled].href
            }`,
          },
        },
      },
    });

    return getEnhancedRes(res, 200, "Payment url has sent successfully", session.url);
  }
}
