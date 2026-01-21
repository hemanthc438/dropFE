import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey) {
        return NextResponse.json({ error: "API key is required" }, { status: 401 });
    }

    // 1. Verify API Key
    const keyRecord = await prisma.apiKey.findUnique({
        where: { key: apiKey },
        include: { project: true },
    });

    if (!keyRecord || keyRecord.revoked) {
        return NextResponse.json({ error: "Invalid or revoked API key" }, { status: 401 });
    }

    const { to, subject, text, html } = await req.json();

    if (!to || !subject || (!text && !html)) {
        return NextResponse.json({ error: "Missing required fields: to, subject, and text/html" }, { status: 400 });
    }

    try {
        // 2. Configure Transporter (Gmail)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // 3. Send Email
        const info = await transporter.sendMail({
            from: `"Dropfe" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });

        // 4. Log Success
        await prisma.emailLog.create({
            data: {
                to,
                subject,
                status: "SENT",
                projectId: keyRecord.projectId,
                sentAt: new Date(),
            },
        });

        // 5. Update Key Usage
        await prisma.apiKey.update({
            where: { id: keyRecord.id },
            data: { lastUsedAt: new Date() }
        });

        return NextResponse.json({ success: true, messageId: info.messageId });

    } catch (error: any) {
        console.error("Email sending failed:", error);

        // Log Failure
        await prisma.emailLog.create({
            data: {
                to,
                subject,
                status: "FAILED",
                projectId: keyRecord.projectId,
                errorMessage: error.message || "Unknown error",
                sentAt: new Date(), // Attempt time
            },
        });

        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
