import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";
import { decodeToken } from "@/lib/jwt";
import links from "@/data/links";
import Links from "@/enums/Links";
import createOrRetrieveCustomerForUser from "@/utils/createOrRetrieveCustomerForUser";
import { Service } from "@prisma/client";
import CheckoutSessionType from "@/enums/CheckoutSessionType";

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

    let request = await prisma.request.findFirst({
      where: {
        id: query.requestId as string,
        deletedAt: null,
      },
      include: {
        service: {
          include: {
            parent: true,
          },
        },
      },
    });

    if (!request) {
      return getEnhancedRes(res, 400, "Invalid request");
    }

    let service = request.service as Service;

    if (request.service.parent) {
      service = request.service.parent;
    }

    if (!request.service.stripeProductId) {
      const product = await stripe.products.create({
        name: service.nameEn,
        default_price_data: {
          currency: "USD",
          unit_amount: service.price * 100,
        },
      });

      const price = await stripe.prices.retrieve(product.default_price as string);

      service = await prisma.service.update({
        where: {
          id: service.id,
        },
        data: {
          stripeProductId: product.id,
          stripePriceId: price.id,
          stripePriceCreateResponse: JSON.stringify(price),
          stripeProductCreateResponse: JSON.stringify(product),
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      metadata: {
        type: CheckoutSessionType.request,
      },
      line_items: [
        {
          price: service.stripePriceId as string,
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_intent_data: {
        metadata: {
          requestId: query.requestId as string,
        },
      },
      invoice_creation: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}${links[Links.PaymentSuccessful].href}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}${links[Links.PaymentFailed].href}`,
    });

    return getEnhancedRes(res, 200, "Payment url has sent successfully", session.url);
  }
}
