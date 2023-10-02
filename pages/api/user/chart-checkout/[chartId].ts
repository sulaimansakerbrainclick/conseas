import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";
import { decodeToken } from "@/lib/jwt";
import links from "@/links/links";
import Links from "@/enums/Links";
import createOrRetrieveCustomerForUser from "@/utils/createOrRetrieveCustomerForUser";
import CheckoutSessionType from "@/enums/CheckoutSessionType";
import Stripe from "stripe";

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

    const customer = await createOrRetrieveCustomerForUser(user);

    let userChart = await prisma.userChart.findFirst({
      where: {
        status: {
          not: "canceled",
        },
        userId: user.id,
        deletedAt: null,
      },
    });

    if (userChart) {
      return getEnhancedRes(res, 400, "You already has a subscription!");
    }

    let chart = await prisma.chart.findFirst({
      where: {
        id: query.chartId as string,
      },
    });

    if (!chart) {
      return getEnhancedRes(res, 404, "Chart not found");
    }

    if (!chart.stripeProductId || !chart.stripeProductResponse) {
      return getEnhancedRes(res, 400, "No price associated with this chart");
    }

    const product = JSON.parse(
      chart.stripeProductResponse as string
    ) as Stripe.Response<Stripe.Product>;

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      metadata: {
        type: CheckoutSessionType.chart,
      },
      line_items: [
        {
          price: product.default_price as string,
          quantity: 1,
        },
      ],
      mode: "subscription",
      subscription_data: {
        metadata: {
          chartId: query.chartId as string,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}${links[Links.PaymentSuccessful].href}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}${links[Links.PaymentFailed].href}`,
    });

    return getEnhancedRes(res, 200, "Payment url has sent successfully", session.url);
  }
}
