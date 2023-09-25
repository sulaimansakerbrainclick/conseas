import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import RequestStatusId from "@/enums/RequestStatusId";
import CheckoutSessionType from "@/enums/CheckoutSessionType";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, query, body, headers } = req;

  if (method === "POST") {
    const buf = await buffer(req);

    const signature = headers["stripe-signature"];

    if (!signature) {
      return getEnhancedRes(res, 400, "Invalid signature");
    }

    let event = stripe.webhooks.constructEvent(
      buf,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    const eventType = event.type;

    switch (eventType) {
      case "customer.subscription.deleted": {
        const checkoutSessionDeleted: any = event.data.object;

        const customer = await stripe.customers.retrieve(checkoutSessionDeleted.customer);

        if (customer.deleted) {
          return getEnhancedRes(res, 400, "Customer has deleted");
        }

        const subscription = await stripe.subscriptions.retrieve(checkoutSessionDeleted.id);

        let userChart = await prisma.userChart.findFirst({
          where: {
            stripeSubscriptionId: subscription.id,
            deletedAt: null,
          },
        });

        if (!userChart) {
          return getEnhancedRes(
            res,
            400,
            `Invalid userChart associated with ${subscription.id} stripeSubscriptionId`
          );
        }

        userChart = await prisma.userChart.update({
          where: {
            id: userChart.id,
          },
          data: {
            status: subscription.status,
          },
        });

        return getEnhancedRes(res, 200, "UserChart created successfully", userChart);
      }

      case "checkout.session.completed": {
        const checkoutSessionCompleted: any = event.data.object;

        const customer = await stripe.customers.retrieve(checkoutSessionCompleted.customer);

        if (customer.deleted) {
          return getEnhancedRes(res, 400, "Customer has deleted");
        }

        const userId = customer.metadata.userId;

        const type = checkoutSessionCompleted.metadata.type;

        const invoice = await stripe.invoices.retrieve(checkoutSessionCompleted.invoice);

        if (type === CheckoutSessionType.chart) {
          const subscription = await stripe.subscriptions.retrieve(
            checkoutSessionCompleted.subscription
          );

          const chartId = subscription.metadata.chartId;

          const chart = await prisma.chart.findFirst({
            where: {
              id: chartId,
              deletedAt: null,
            },
          });

          if (!chart) {
            return getEnhancedRes(res, 400, `Invalid chart ${chartId}`);
          }

          const userChart = await prisma.userChart.create({
            data: {
              chartId,
              userId,
              stripeSubscriptionId: subscription.id,
              status: subscription.status,
              currentPeriodStart: new Date(subscription.current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              stripeSubscriptionCreateResponse: JSON.stringify(subscription),
            },
          });

          await prisma.invoice.create({
            data: {
              userId: userId,
              stripeData: JSON.stringify(invoice),
            },
          });

          return getEnhancedRes(res, 200, "UserChart created successfully", userChart);
        }

        if (type === CheckoutSessionType.request) {
          const paymentIntent = await stripe.paymentIntents.retrieve(
            checkoutSessionCompleted.payment_intent
          );

          const requestId = paymentIntent.metadata.requestId;

          let request = await prisma.request.findFirst({
            where: {
              id: requestId,
              deletedAt: null,
            },
          });

          if (!request) {
            return getEnhancedRes(res, 400, `Invalid request ${requestId}`);
          }

          request = await prisma.request.update({
            where: {
              id: requestId,
            },
            data: {
              stripepaymentIntentId: paymentIntent.id,
              requestStatus: {
                connect: { id: RequestStatusId.Pending },
              },
            },
          });

          await prisma.invoice.create({
            data: {
              userId: userId,
              stripeData: JSON.stringify(invoice),
            },
          });

          return getEnhancedRes(res, 200, "Request updated successfully", request);
        }
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return getEnhancedRes(res, 200, `${eventType} is done!`);
  }
}
