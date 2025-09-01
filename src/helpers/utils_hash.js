import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export async function hashPassword(plainPassword) {
  try {
    if (!plainPassword) {
      throw new Error("Password is required for hashing");
    }
    return await bcrypt.hash(plainPassword, SALT_ROUNDS);
  } catch (err) {
    console.error("Hashing error:", err);
    throw err;
  }
}

export async function verifyPassword(storedHash, inputPassword) {
  try {
    if (!storedHash || !inputPassword) {
      throw new Error("Both hash and input password are required");
    }
    return await bcrypt.compare(inputPassword, storedHash);
  } catch (err) {
    console.error("Verification error:", err);
    return false;
  }
}
