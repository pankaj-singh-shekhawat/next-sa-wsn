// helpers/jwtHelper.js
import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

// ✅ Sign JWT
export function signToken(payload, expiresIn = "1d") {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign(payload, secret, { expiresIn });
}

// ✅ Verify JWT
export function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    return jwt.verify(token, secret); // returns the decoded payload if valid
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return null; // return null instead of throwing for easier handling
  }
}
