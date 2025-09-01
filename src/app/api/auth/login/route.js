import { NextResponse } from "next/server";
import { signToken } from "@/helpers/utils_jwt.js";
import { authenticateUserByEmailPwd } from "@/models/userModel.js";
import { cookies } from "next/headers";

export async function POST(req) {
  let statuscode = 200;
  let resp = { error: false, message: "" };

  try {
    const { email, password } = await req.json();

    if (!email) throw new Error("Email cannot be empty.");
    if (!password) throw new Error("Password cannot be empty.");

    // Authenticate user
    const authResp = await authenticateUserByEmailPwd(email, password);
    if (authResp.error) throw new Error(authResp.message);

    if (!authResp.hasOwnProperty("user")) {
      throw new Error("Unable to proceed since user not traceable.");
    }

    const user = authResp.user;

    // Generate JWT token
    const TokenData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    };
    const token = signToken(TokenData);

    // Set cookie
    cookies().set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60, // 1 day in seconds
      sameSite: "strict",
    });

    resp.message = "User authenticated successfully.";
    resp.token = token;
    resp.profile = { ...user, passwordhash: null };
  } catch (err) {
    resp.error = true;
    resp.message = err.message || err;
    statuscode = 400;
  }

  return NextResponse.json(resp, { status: statuscode });
}