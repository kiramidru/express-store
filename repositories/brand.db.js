import prisma from "../prisma.js";

export async function createBrand(data) {
  return await prisma.brand.create({ data });
}

export async function getFilteredBrand(where, skip, take) {
  return await prisma.brand.findMany({ where, skip, take });
}
export async function getBrandByID(id) {
  return await prisma.brand.findUnique({ where: { id } });
}

export async function updateBrand(id, data) {
  return await prisma.brand.update({
    where: { id },
    data,
  });
}

export async function getBrandCount(where) {
  return await prisma.brand.count({ where });
}
