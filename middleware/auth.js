import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const JWT_SECRET = process.env.JWT_SECRET;

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const accessToken = authHeader.split("Bearer ")[1];
  jwt.verify(accessToken, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

export function isVerified(req, res, next) {
  if (req.user?.verified) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Access Denied: Account not verified" });
  }
}

export function isAdmin(req, res, next) {
  if (req.user?.role === "ADMIN") {
    next();
  } else {
    return res.status(403).json({ message: "Access Denied: Admin Only" });
  }
}

export function isSeller(req, res, next) {
  if (req.user?.role === "SELLER") {
    next();
  } else {
    return res.status(403).json({ message: "Acces Denied: Sellers Only" });
  }
}

export function isCustomer(req, res, next) {
  if (req.user?.role === "CUSTOMER") {
    next();
  } else {
    return res.status(403).json({ message: "Access Denied: Customers Only" });
  }
}
