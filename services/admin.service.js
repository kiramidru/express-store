import * as categoryRespository from "../repositories/category.db.js";
import * as userRepository from "../repositories/user.db.js";

export async function createCategory(data) {
  return await categoryRespository.createCategory(data);
}

export async function verifyUser(email) {
  const data = {
    verified: true,
  };
  return await userRepository.updateUser(email, data);
}
