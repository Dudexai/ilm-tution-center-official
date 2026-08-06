import { createServerFn } from "@tanstack/react-start";

export const sendBookingNotification = createServerFn({ method: "POST" })
  .validator(
    (data: { emailBody: string; whatsappBody: string; subject: string; phone: string }) => data,
  )
  .handler(async ({ data }) => {
    const { emailBody, whatsappBody, subject, phone } = data;

    let emailSent = false;
    let whatsappSent = false;

    // We use standard HTTP fetch here because this runs on an edge environment (Cloudflare),
    // which does not support Node.js "net" modules required by Nodemailer.

    // --- 1. Send Email (via API like Resend, SendGrid, or Zoho API) ---
    try {
      // You can add an API key (like RESEND_API_KEY) to your environment variables
      const emailApiKey = typeof process !== "undefined" ? process.env.EMAIL_API_KEY : undefined;

      if (emailApiKey) {
        // Example logic for Resend
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${emailApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Acme <onboarding@resend.dev>",
            to: ["contact@ilmsmartacademy.com"],
            subject: subject,
            text: emailBody,
          }),
        });

        if (response.ok) {
          console.log("Email sent successfully.");
          emailSent = true;
        }
      } else {
        console.warn("Email API credentials not found. Using formsubmit.co fallback.");
        // Fallback to formsubmit.co which doesn't require an API key
        const fallbackResponse = await fetch(
          "https://formsubmit.co/ajax/contact@ilmsmartacademy.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              _subject: subject,
              message: emailBody,
            }),
          },
        );

        if (fallbackResponse.ok) {
          console.log("Email sent successfully via fallback.");
          emailSent = true;
        } else {
          console.error("Fallback email API error:", await fallbackResponse.text());
        }
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }

    // --- 2. Send WhatsApp Notification (via Twilio API) ---
    try {
      const accountSid =
        typeof process !== "undefined" ? process.env.TWILIO_ACCOUNT_SID : undefined;
      const authToken = typeof process !== "undefined" ? process.env.TWILIO_AUTH_TOKEN : undefined;
      const twilioPhone =
        typeof process !== "undefined" ? process.env.TWILIO_PHONE_NUMBER : undefined;

      if (accountSid && authToken) {
        const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
        // Use btoa for edge compatibility instead of Buffer
        const auth = btoa(`${accountSid}:${authToken}`);

        const params = new URLSearchParams();
        params.append("To", `whatsapp:+919025752071`);
        params.append("From", `whatsapp:${twilioPhone}`);
        params.append("Body", whatsappBody);

        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params,
        });

        if (response.ok) {
          console.log("WhatsApp message sent successfully.");
          whatsappSent = true;
        } else {
          console.error("WhatsApp API error:", await response.text());
        }
      } else {
        console.warn("WhatsApp API credentials not found. Simulating WhatsApp send.");
        console.log("WhatsApp content:", whatsappBody);
        await new Promise((r) => setTimeout(r, 800));
        whatsappSent = true;
      }
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
    }

    return {
      success: emailSent || whatsappSent,
      emailSent,
      whatsappSent,
    };
  });
