"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // Basic validation
    if (!name || !email || !message) {
        return {
            success: false,
            error: "All fields are required",
        }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return {
            success: false,
            error: "Invalid email address",
        }
    }

    try {
        const { data, error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>", // You'll update this with your verified domain
            to: ["ratanbunkar2@gmail.com"], // Your email where you want to receive messages
            replyTo: email, // This allows you to reply directly to the sender
            subject: `New Portfolio Contact from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New Contact Form Submission</h2>
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                        <p style="margin: 10px 0;"><strong>Message:</strong></p>
                        <p style="margin: 10px 0; padding: 15px; background-color: white; border-radius: 3px; white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="color: #666; font-size: 12px; margin-top: 20px;">
                        This message was sent from your portfolio contact form.
                    </p>
                </div>
            `,
        })

        if (error) {
            console.error("Resend error:", error)
            return {
                success: false,
                error: "Failed to send email. Please try again later.",
            }
        }

        return {
            success: true,
            data,
        }
    } catch (error) {
        console.error("Error sending email:", error)
        return {
            success: false,
            error: "An unexpected error occurred. Please try again later.",
        }
    }
}
