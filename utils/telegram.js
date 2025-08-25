import crypto from "crypto";
import querystring from "querystring";

const botToken = process.env.BOT_TOKEN;

export function generateInitData(user) {
  const params = {
    user_id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    auth_date: Math.floor(Date.now() / 1000),
  };

  const dataCheckString = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("\n");

  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();

  const hash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  const urlParams = new URLSearchParams({ ...params, hash });
  return urlParams.toString();
}

export function verifyTelegram(initData) {
  if (!initData || typeof initData !== "string") {
    throw new Error("Missing data");
  }

  const data = querystring.parse(initData);
  const hash = data.hash;
  delete data.hash;

  const dataCheckString = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join("\n");

  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();

  const calculatedHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  const hmacBuf = Buffer.from(calculatedHash, "hex");

  let hashBuf;
  hashBuf = Buffer.from(hash, "hex");

  if (hmacBuf.length !== hashBuf.length) {
    throw new Error("Hash length mismatch");
  }
  const equal = crypto.timingSafeEqual(hmacBuf, hashBuf);
  if (!equal) throw new Error("Hash mismatch");

  const user = JSON.parse(data.user);
  return user;
}
