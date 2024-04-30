import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { Request, Response } from "express";

import ENV from "../config";

let nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "aryanna.moore@ethereal.email",
    pass: "kE6kJsmZ6F8BpSkJ3d",
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

export const registerMail = async (req: Request, res: Response) => {
  const { username, userEmail, text, subject } = req.body;
  var email = {
    body: {
      name: username,
      intro:
        text ||
        "Welcome to our family! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  var emailBody = mailGenerator.generate(email);

  let message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || "Sign Up Successfully",
    html: emailBody,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ message: "You Should receive an email from us" });
    })
    .catch((err) => res.status(500).send({ error: err }));
};
