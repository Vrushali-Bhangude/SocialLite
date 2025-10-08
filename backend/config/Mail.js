import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = async (to, otp) => {
    transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject: "Reset Your Password –SocialLightHub",
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f3f9ff; border-radius: 8px;">
        <h2 style="color: #1b9c85;">Reset Your Password</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password for your <strong>SocialLightHub</strong> account.</p>
        <p style="font-size: 18px; font-weight: bold; color: #ff004f;">
          Your OTP is: ${otp}
        </p>
        <p>This OTP is valid for the next <strong>5 minutes</strong>.</p>
        <p>If you didn’t request a password reset, please ignore this email.</p>
        <br/>
        <p>Thanks,<br/>The SocialLightHub Team</p>
      </div>
    `,
   })
}

export default sendMail