import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { User } from "@prisma/client";

const createOrRetrieveCustomerForUser = async (user: User) => {
  let customer;

  const customerParams = {
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    metadata: {
      userId: user.id,
    },
  };

  if (!user.stripeCustomerId) {
    customer = await stripe.customers.create(customerParams);

    user = await prisma.user.update({
      where: {
        id: user.id as string,
        deletedAt: null,
      },
      data: {
        stripeCustomerId: customer.id,
        stripeCustomerCreateResponse: JSON.stringify(customer),
      },
    });
  } else {
    customer = await stripe.customers.retrieve(user.stripeCustomerId);
  }

  return customer;
};

export default createOrRetrieveCustomerForUser;
