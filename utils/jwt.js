import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export function signToken(payload, expiresIn = "1h") {
  return jwt.sign(payload, jwtSecret, { expiresIn });
}

export const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};
