import prisma from "../prisma.js";
import * as productRepository from "../repositories/product.db.js";
import * as brandRepository from "../repositories/brand.db.js";
import * as orderRepository from "../repositories/order.db.js";

export async function createProduct(data) {
  return await productRepository.createProduct(data);
}

export async function getFilteredProducts(data) {
  const { sellerId, categoryId, page, limit } = data;
  const where = {
    sellerId,
    ...(categoryId && { sellerId: Number(categoryId) }),
  };

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const products = await productRepository.getFilteredProducts(
    where,
    skip,
    take,
  );

  const total = await productRepository.getProductCount();
  return {
    data: products,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getFilteredOrders(data) {
  const { brandId, productId, page, limit } = data;
  const where = {
    brandId,
    ...(productId && { productId: Number(productId) }),
  };
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const total = await orderRepository.getOrderCount();
  const totalPages = Math.ceil(total / limit);

  const orders = await orderRepository.getFilteredOrders(where, skip, take);

  return {
    data: orders,
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
  };
}

export async function getProductById(id) {
  return await prisma.product.findUnique({ where: { id } });
}

export async function createBrand(data) {
  return await brandRepository.createBrand(data);
}
