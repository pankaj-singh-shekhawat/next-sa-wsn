import { NextResponse } from "next/server";
import { hashPassword } from "@/helpers/utils_hash.js";
import { checkAndcreateNewUser } from "@/models/userModel.js";

export async function POST(req) {
  let statuscode = 200;
  let resp = { error: false, message: "", success: false };

  try {
    const { name, email, password } = await req.json();

    // Validate inputs
    if (!name) throw new Error("Name cannot be empty.");
    if (!email) throw new Error("Email cannot be empty.");
    if (!password) throw new Error("Password cannot be empty.");

    // Hash password before storing
    const passwordHash = await hashPassword(password);

    // Call model function
    const createResp = await checkAndcreateNewUser(name, email, passwordHash);
    if (createResp.error) throw new Error(createResp.message);

    statuscode = 201;
    resp.message = "New user created successfully. Admin to approve request.";
    resp.success = true;
  } catch (err) {
    resp.error = true;
    resp.message = err.message || err;
    statuscode = 400;
  }

  return NextResponse.json(resp, { status: statuscode });
}