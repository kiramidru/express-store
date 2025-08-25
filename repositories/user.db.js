import prisma from "../prisma.js";

export async function createUser(data) {
  return await prisma.user.upsert({
    where: { userId: data.userId },
    update: data,
    create: data,
  });
}

export async function getUserById(userId) {
  return await prisma.user.findUnique({
    where: { userId },
  });
}

export async function updateUser(userId, data) {
  return await prisma.user.update({
    where: { userId },
    data,
  });
}
