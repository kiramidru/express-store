import prisma from "../prisma.js";

export async function createRefreshToken(data) {
  return await prisma.refreshToken.create({ data });
}

export async function getRefreshTokenById(id) {
  return await prisma.refreshToken.findUnique(id);
}
