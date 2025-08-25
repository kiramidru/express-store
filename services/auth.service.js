import { signToken } from "../utils/jwt.js";
import { verifyTelegram } from "../utils/telegram.js";
import * as userRepository from "../repositories/user.db.js";

export async function auth(initData) {
  const result = verifyTelegram(initData);

  const accessTokenExpiresAt = Math.floor(Date.now() / 1000) + 1 * 60 * 60;
  const userId = Number(result.id);
  let user = {
    userId: userId,
    firstName: result.first_name,
    lastName: result.last_name,
    username: result.username,
    photoUrl: result.photo_url,
  };

  user = await userRepository.createUser(user);
  const accessToken = signToken(user);

  user = { ...user, accessToken, accessTokenExpiresAt };
  return user;
}
