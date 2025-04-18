import { sendEmail } from "../utils/send-email.js";
import { tryCatch } from "../utils/try-catch.js";
import User from "../models/User.js";
import { checkEmailFormat } from "../utils/helper.js";

export const sendOTP = tryCatch(async (req, res) => {
  const { username, email, subject } = req.body;
  const code = req.otp;

  const emailData = {
    userName: username,
    userEmail: email,
    verificationCode: code,
  };

  const result = await sendEmail({
    to: email,
    subject:
      subject ||
      "✨ Verify Your Email for Kravy 🍴🥗 - Your OTP Code is Ready!",
    templateName: "otp",
    templateData: emailData,
  });

  res.status(200).json(result);
});

export const sendLoginOtp = tryCatch(async (req, res) => {
  const { email, subject } = req.body;
  const code = req.otp;

  const validEmail = checkEmailFormat(email);
  if (!validEmail.success) {
    return res.status(400).json({ success: false, msg: validEmail.msg });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, msg: "User not found" });
  }

  const emailData = {
    userName: user.username,
    userEmail: user.email,
    verificationCode: code,
  };

  const result = await sendEmail({
    to: email,
    subject:
      subject ||
      "✨ Verify Your Email for Kravy 🍴🥗 - Your OTP Code is Ready!",
    templateName: "otp",
    templateData: emailData,
  });

  res.status(200).json(result);
});

export const sendRegistrationSuccessEmail = tryCatch(async (req, res, next) => {
  const { username, email } = req.body;
  const subject = req.subject || "Welcome to Kravy! 🎉 Your Account is Ready";

  const validEmail = checkEmailFormat(email);
  if (!validEmail.success) {
    return res.status(400).json({ success: false, msg: validEmail.msg });
  }

  const emailData = {
    userName: username,
    userEmail: email,
    verificationCode: "1234", // Adjust as needed
  };

  const result = await sendEmail({
    to: email,
    subject,
    templateName: "registration-success",
    templateData: emailData,
  });

  console.log("Email sent:", result);
  req.body.email = email;
  req.emailResult = result;

  next();
});

export const resetPasswordEmail = tryCatch(async (req, res) => {
  const { email } = req.body;
  const subject = "🔒 Reset Your Kravy Password 🚀";

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, msg: "User not found" });
  }

  const resetPasswordToken =
    req.body.resetPasswordToken || user.resetPasswordToken;
  const resetPasswordExpires =
    req.body.resetPasswordExpires || user.resetPasswordExpires;

  if (!resetPasswordToken || !resetPasswordExpires) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid or missing token data" });
  }

  const validEmail = checkEmailFormat(email);
  if (!validEmail.success) {
    return res.status(400).json({ success: false, msg: validEmail.msg });
  }

  const emailData = {
    userName: user.username,
    userEmail: email,
    resetPasswordToken,
    resetPasswordExpires,
  };

  const result = await sendEmail({
    to: email,
    subject,
    templateName: "forget-password",
    templateData: emailData,
  });

  res.status(200).json(result);
});

export const sendOrderSuccessEmail = async ({ username, email }) => {
  console.log("em", email);
  const subject =
    "🎉 Hooray! Your order has been created and is ready to be shipped! 🚚📦";

  // Validate the email format
  const validEmail = checkEmailFormat(email);
  if (!validEmail.success) {
    throw new Error(validEmail.msg); // Throw an error to handle it outside
  }

  const emailData = {
    userName: username,
    userEmail: email,
    verificationCode: "1234", // You might want to dynamically generate this code
  };

  try {
    const result = await sendEmail({
      to: email,
      subject,
      templateName: "registration-success",
      templateData: emailData,
    });

    console.log("Email sent:", result);
    return result; // Returning the result of the email send operation
  } catch (err) {
    console.error("Email sending failed:", err.message);
    throw new Error("Email sending failed");
  }
};
