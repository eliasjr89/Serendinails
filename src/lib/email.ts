import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");

export interface ContactEmailProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
}

export const sendContactEmail = async ({
  name,
  email,
  phone,
  message,
  subject,
}: ContactEmailProps) => {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is missing");
    return { success: false, error: "Configuration Error" };
  }

  try {
    const data = await resend.emails.send({
      from: " Website <onboarding@resend.dev>", // Update this with your verified domain later
      to: ["nailscouture@gmail.com"], // The business email
      replyTo: email,
      subject: subject || `Nuevo mensaje de contacto de ${name}`,
      html: `
        <h1>Nuevo Mensaje de Contacto</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "No proporcionado"}</p>
        <hr />
        <h3>Mensaje:</h3>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
};
