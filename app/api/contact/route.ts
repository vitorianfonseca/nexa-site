import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, projectType, message } = body;

    if (!name?.trim() || !email?.trim() || !projectType?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Nexa Contact Form" <${process.env.GMAIL_USER}>`,
      to: "hello@bynexa.dev",
      replyTo: email,
      subject: `[Nexa] ${projectType} — ${name}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: linear-gradient(135deg, #2A1363 0%, #7E4CC4 60%, #C8A2E8 100%); padding: 28px 32px; border-radius: 12px 12px 0 0;">
            <p style="color: rgba(255,255,255,0.6); font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 6px 0;">New inquiry</p>
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">${projectType}</h1>
          </div>
          <div style="background: #f5f5f2; padding: 28px 32px; border-radius: 0 0 12px 12px; border: 0.5px solid rgba(26,26,26,0.08);">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 0.5px solid rgba(26,26,26,0.08);">
                <td style="padding: 10px 0; font-weight: 600; font-size: 13px; color: #6B6B6B; width: 120px; vertical-align: top;">Name</td>
                <td style="padding: 10px 0; font-size: 14px;">${name}</td>
              </tr>
              <tr style="border-bottom: 0.5px solid rgba(26,26,26,0.08);">
                <td style="padding: 10px 0; font-weight: 600; font-size: 13px; color: #6B6B6B; vertical-align: top;">Email</td>
                <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #2A1363; text-decoration: none;">${email}</a></td>
              </tr>
              ${company?.trim() ? `
              <tr style="border-bottom: 0.5px solid rgba(26,26,26,0.08);">
                <td style="padding: 10px 0; font-weight: 600; font-size: 13px; color: #6B6B6B; vertical-align: top;">Company</td>
                <td style="padding: 10px 0; font-size: 14px;">${company}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 10px 0; font-weight: 600; font-size: 13px; color: #6B6B6B; vertical-align: top;">Project type</td>
                <td style="padding: 10px 0; font-size: 14px;">${projectType}</td>
              </tr>
            </table>
            <div style="border-top: 0.5px solid rgba(26,26,26,0.08); padding-top: 20px;">
              <p style="font-weight: 600; font-size: 13px; color: #6B6B6B; margin: 0 0 10px 0;">Message</p>
              <p style="font-size: 14px; line-height: 1.7; margin: 0; color: #1a1a1a;">${message.replace(/\n/g, "<br>")}</p>
            </div>
            <div style="margin-top: 24px; padding-top: 20px; border-top: 0.5px solid rgba(26,26,26,0.08);">
              <a href="mailto:${email}" style="display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; background: linear-gradient(135deg, #2A1363, #7E4CC4); color: white; border-radius: 100px; font-size: 13px; font-weight: 600; text-decoration: none;">Reply to ${name}</a>
            </div>
          </div>
          <p style="text-align: center; font-size: 11px; color: rgba(26,26,26,0.3); margin-top: 20px;">Sent via bynexa.dev contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
