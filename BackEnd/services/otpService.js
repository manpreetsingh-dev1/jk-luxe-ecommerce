import crypto from "crypto";

// Generate OTP
export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// OTP expiry (5 minutes)
export const getOTPExpiry = () => {
  return new Date(Date.now() + 5 * 60 * 1000);
};

// Fake email sender (replace with real email service later)
export const sendOTPEmail = async (email, otp) => {
  console.log("================================");
  console.log(`OTP for ${email} is: ${otp}`);
  console.log("================================");
};