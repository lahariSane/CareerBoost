import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};

export const hashOTP = async (otp) => {
  return await bcrypt.hash(otp, 10);
};

export const verifyOTP = async (inputOTP, hashedOTP) => {
  return await bcrypt.compare(inputOTP, hashedOTP);
};
