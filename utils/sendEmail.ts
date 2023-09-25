import nodemailer from "nodemailer";

const sendEmail = async ({
  from,
  to,
  subject,
  text,
  html,
  auth,
}: {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  auth: {
    user: string | undefined;
    pass: string | undefined;
  };
}) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth,
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
};

export default sendEmail;
