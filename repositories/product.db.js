import prisma from "../prisma.js";

export async function createProduct(data) {
  return await prisma.product.create({ data });
}

export async function getFilteredProducts(where, skip, take) {
  return await prisma.product.findMany({ where, skip, take });
}

export async function getProductByID(id) {
  return await prisma.product.findUnique({ where: { id } });
}

export async function getProductPriceByID(id) {
  return await prisma.product.findUnique({
    where: { id },
    select: { price: true },
  });
}

export async function updateProduct(id, data) {
  return await prisma.product.update({
    where: { id },
    data,
  });
}

export async function getProductCount(where) {
  return await prisma.product.count({ where });
}
