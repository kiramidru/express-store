import prisma from "../prisma.js";

export const createCategory = async (data) => {
  return await prisma.category.create({ data });
};

export async function getFilteredCategories(where, skip, take) {
  return await prisma.category.findMany({ where, skip, take });
}
export async function getCategoryByName(name) {
  return await prisma.category.findUnique({ where: { name } });
}

export async function getCategoryCount(where) {
  return await prisma.category.count({ where });
}
