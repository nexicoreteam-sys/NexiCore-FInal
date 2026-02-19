import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message, timestamp } = body;

    // Validate required fields
    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const formattedTime = new Date(timestamp).toLocaleString("ro-RO", {
      timeZone: "Europe/Bucharest",
      dateStyle: "full",
      timeStyle: "short",
    });

    await transporter.sendMail({
      from: `"Nexicore Contact" <${process.env.GMAIL_USER}>`,
      to: "nexicoreteam@gmail.com",
      subject: `Mesaj nou de la ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 10px;">
          <h2 style="color: #030303; border-bottom: 3px solid #02defc; padding-bottom: 10px; margin-bottom: 24px;">
            Mesaj nou prin formularul Nexicore
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #555; font-weight: bold; width: 140px;">Nume:</td>
              <td style="padding: 10px 0; color: #111;">${name}</td>
            </tr>
            <tr style="background: #f0f0f0;">
              <td style="padding: 10px 8px; color: #555; font-weight: bold;">Telefon:</td>
              <td style="padding: 10px 8px; color: #111;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #555; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0; color: #111;"><a href="mailto:${email}" style="color: #02defc;">${email}</a></td>
            </tr>
            <tr style="background: #f0f0f0;">
              <td style="padding: 10px 8px; color: #555; font-weight: bold; vertical-align: top;">Mesaj:</td>
              <td style="padding: 10px 8px; color: #111; white-space: pre-wrap;">${message}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #555; font-weight: bold;">Data:</td>
              <td style="padding: 10px 0; color: #777; font-size: 13px;">${formattedTime}</td>
            </tr>
          </table>
          <p style="margin-top: 30px; font-size: 12px; color: #aaa; text-align: center;">
            Trimis automat de nexicore.ro
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
