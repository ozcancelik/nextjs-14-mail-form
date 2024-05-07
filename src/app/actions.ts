"use server";
import nodemailer from 'nodemailer';
import * as handlebars from "handlebars";
import { contactTemplate } from "../templates/contact";


interface Data {
  nameSurname: string;
  email: string;
  message: string;
  phone: string;
  token: string;
}

export async function sendContactForm(data: Data) {
  const human = await validateHuman(data.token);
  if (!human) {
    return { error: "It's a bot! ❤️ ❌ 🤖" };
  }

  const transporter = nodemailer.createTransport({
    port: 465,
    secure: true,
    host: process.env.CONTACT_FORM_HOST,
    auth: {
      user: process.env.CONTACT_FORM_SEND_EMAIL,
      pass: process.env.CONTACT_FORM_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const body = await compileWelcomeTemplate(data.nameSurname, data.email, data.phone, data.message);

    await transporter.sendMail({
      from: `Website Contact Form ${process.env.CONTACT_FORM_SEND_EMAIL}`,
      replyTo: data.email,
      to: process.env.CONTACT_FORM_RECEIVE_EMAIL,
      subject: `A contact form from - ${data.nameSurname}`,
      html: body,
    });

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { error: err?.response };
  }
}

async function validateHuman(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: 'POST',
    }
  );
  const data = await response.json();
  return data.success;
}


export async function compileWelcomeTemplate(nameSurname: string, email: string, phone: string, message: string) {
  const template = handlebars.compile(contactTemplate);
  const htmlBody = template({
    nameSurname,
    email,
    phone,
    message,
  });
  return htmlBody;
}