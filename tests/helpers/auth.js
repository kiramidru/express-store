import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

function generateTestToken(payload) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export { generateTestToken };
