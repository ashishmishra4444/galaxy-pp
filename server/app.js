import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";
import { connectDB } from "./db.js";
import Message from "./models/Message.js";

dotenv.config();

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const RESEND_FROM =
  process.env.RESEND_FROM || "Galaxy 2026 <onboarding@resend.dev>";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "";

const RELATIONSHIP_OPTIONS = new Set(["Branch mate", "Junior", "Other"]);
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;
const allowedOrigins = CLIENT_URL.split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  if (allowedOrigins.length === 0) {
    return true;
  }

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  // Allow Vercel preview/production domains for easier deployment.
  if (origin.endsWith(".vercel.app")) {
    return true;
  }

  return false;
};

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json());

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 6,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many submissions from this device. Please try again in a bit.",
  },
});

app.get("/", (_req, res) => {
  res.status(200).json({
    ok: true,
    message: "Galaxy 2026 API is running",
    health: "/api/health",
  });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true, message: "Galaxy 2026 API is running" });
});

app.post("/api/messages", submitLimiter, async (req, res) => {
  try {
    await connectDB();

    const { name, relationship, relationshipOther, message } = req.body;
    const normalizedRelationship = relationship?.trim() || "";
    const normalizedOther = relationshipOther?.trim() || "";
    const normalizedMessage = message?.trim() || "";
    const normalizedName = name?.trim() || "Anonymous";

    if (!normalizedRelationship || !normalizedMessage) {
      return res.status(400).json({
        success: false,
        message: "Relationship and message are required.",
      });
    }

    if (!RELATIONSHIP_OPTIONS.has(normalizedRelationship)) {
      return res.status(400).json({
        success: false,
        message: "Please choose a valid connection.",
      });
    }

    if (normalizedRelationship === "Other" && !normalizedOther) {
      return res.status(400).json({
        success: false,
        message: "Please specify your connection when selecting Other.",
      });
    }

    const savedMessage = await Message.create({
      name: normalizedName,
      relationship: normalizedRelationship,
      relationshipOther: normalizedOther,
      message: normalizedMessage,
    });

    const senderName = savedMessage.name || "Anonymous";
    const relationshipLabel =
      savedMessage.relationship === "Other" && savedMessage.relationshipOther
        ? `Other - ${savedMessage.relationshipOther}`
        : savedMessage.relationship;

    if (resend && NOTIFY_EMAIL) {
      await resend.emails.send({
        from: RESEND_FROM,
        to: [NOTIFY_EMAIL],
        subject: `New Galaxy message from ${senderName}`,
        text: `New Galaxy 2026 memory\n\nFrom: ${senderName}\nRelationship: ${relationshipLabel}\n\nMessage:\n${savedMessage.message}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #3f2430; max-width: 640px; margin: 0 auto; padding: 24px; background: #fff7f9; border: 1px solid #f3d7e1; border-radius: 18px;">
            <h2 style="margin: 0 0 16px; color: #7d3f51;">New Galaxy 2026 Memory</h2>
            <p style="margin: 0 0 8px;"><strong>From:</strong> ${senderName}</p>
            <p style="margin: 0 0 20px;"><strong>Relationship:</strong> ${relationshipLabel}</p>
            <div style="padding: 16px 18px; background: #ffffff; border: 1px solid #f0d9e1; border-radius: 14px; white-space: pre-wrap; color: #5a3341;">
              ${savedMessage.message
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")}
            </div>
          </div>
        `,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Memory Captured!",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Message submission failed:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map((item) => item.message)
          .join(" "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong while saving your memory.",
    });
  }
});

export default app;
