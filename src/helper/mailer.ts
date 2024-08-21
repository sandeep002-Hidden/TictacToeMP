import User from "@/model/user.model";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import generatePassword from "./generateRandom6DigitPassword";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  const otp = await generatePassword();
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 10 * 60 * 1000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: otp,
        forgotPasswordTokenExpire: Date.now() + 10 * 60 * 1000,
      });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAILUSER,
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      html:
        emailType === "VERIFY"
          ? `<button> <a href="${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}" target="_blank">Click me</a> </button> ${
              emailType === "VERIFY" ? "Verify Email" : "Reset Password"
            } or open the link in your browser <br>${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}</br>`
          : `<h1>your Otp is <strong>${otp}</strong></h1><br/>
      <p>This Otp is Expiry in 10 minutes </p>`,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};