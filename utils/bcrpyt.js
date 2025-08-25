import bcrypt from "bcrypt";

export async function hashData(data, rounds = 12) {
  try {
    const hashedData = await bcrypt.hash(data, rounds);
    return hashedData;
  } catch (err) {
    console.error("error:", err);
    throw err;
  }
}

export async function verifyHash(data, hashedData) {
  try {
    const isMatch = await bcrypt.compare(data, hashedData);
    return isMatch;
  } catch (err) {
    console.error("error:", err);
    throw err;
  }
}
