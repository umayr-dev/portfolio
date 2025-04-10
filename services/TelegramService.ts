const BOT_TOKEN = "7942217828:AAEyNY1Sw9DGSV91KwEXtpG-ieKplMQ04ac";
const CHAT_ID = "-4782446940";

export const sendMessage = async ({ name, email, message }: { name: string; email: string; message: string }) => {
  const text = `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }
};