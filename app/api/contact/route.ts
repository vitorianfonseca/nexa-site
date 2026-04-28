import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter: max 3 requests per IP per 10 minutes.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 10 * 60 * 1000; // 10 min
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + window });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const ALLOWED_PROJECT_TYPES = new Set([
  "Landing Page",
  "Institutional Website",
  "Web Application",
  "Other",
]);

const ALLOWED_ORIGINS = new Set([
  "https://bynexa.dev",
  "https://www.bynexa.dev",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
]);

export async function POST(req: NextRequest) {
  // CSRF: validate Origin header
  const origin = req.headers.get("origin") ?? "";
  if (!ALLOWED_ORIGINS.has(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Rate limiting by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { name, email, company, projectType, message } = body;

    if (!name?.trim() || !email?.trim() || !projectType?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (!ALLOWED_PROJECT_TYPES.has(projectType)) {
      return NextResponse.json({ error: "Invalid project type" }, { status: 400 });
    }

    const safeName = esc(name.trim());
    const safeEmail = esc(email.trim());
    const safeCompany = company?.trim() ? esc(company.trim()) : "";
    const safeProjectType = esc(projectType);
    const safeMessage = esc(message.trim()).replace(/\n/g, "<br>");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Nexa Contact" <${process.env.GMAIL_USER}>`,
      to: "hello@bynexa.dev",
      replyTo: `"${safeName}" <${email.trim()}>`,
      subject: `[Nexa] ${safeProjectType} — ${safeName}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: linear-gradient(135deg, #2A1363 0%, #7E4CC4 60%, #C8A2E8 100%); padding: 28px 32px; border-radius: 12px 12px 0 0;">
            <p style="color: rgba(255,255,255,0.6); font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 6px 0;">New inquiry</p>
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">${safeProjectType}</h1>
          </div>
          <div style="background: #f5f5f2; padding: 28px 32px; border-radius: 0 0 12px 12px; border: 0.5px solid rgba(26,26,26,0.08);">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 0.5px solid rgba(26,26,26,0.08);">
                <td style="padding: 10px 0; font-weight: 600; font-size: 13px; color: #6B6B6B; width: 120px; vertical-align: top;">Name</td>
                <td style="padding: 10px 0; font-size: 14px;">${safeName}</td>
              </tr>
              <tr style="border-bottom: 0.5px solid rgba(26,26,26,0.08);">
                <td style="padding: 10px 0; font-weight: 600; font-size: 13px; color: #6B6B6B; vertical-align: top;">Email</td>
                <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #2A1363; text-decoration: none;">${safeEmail}</a></td>
              </tr>
              ${safeCompany ? `
              <tr style="border-bottom: 0.5px solid rgba(26,26,26,0.08);">
                <td style="padding: 10px 0; font-weight: 600; font-size: 13px; color: #6B6B6B; vertical-align: top;">Company</td>
                <td style="padding: 10px 0; font-size: 14px;">${safeCompany}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 10px 0; font-weight: 600; font-size: 13px; color: #6B6B6B; vertical-align: top;">Project type</td>
                <td style="padding: 10px 0; font-size: 14px;">${safeProjectType}</td>
              </tr>
            </table>
            <div style="border-top: 0.5px solid rgba(26,26,26,0.08); padding-top: 20px;">
              <p style="font-weight: 600; font-size: 13px; color: #6B6B6B; margin: 0 0 10px 0;">Message</p>
              <p style="font-size: 14px; line-height: 1.7; margin: 0; color: #1a1a1a;">${safeMessage}</p>
            </div>
            <div style="margin-top: 24px; padding-top: 20px; border-top: 0.5px solid rgba(26,26,26,0.08);">
              <a href="mailto:${safeEmail}" style="display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; background: linear-gradient(135deg, #2A1363, #7E4CC4); color: white; border-radius: 100px; font-size: 13px; font-weight: 600; text-decoration: none;">Reply to ${safeName}</a>
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
