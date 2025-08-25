import * as orderRepository from "../repositories/order.db.js";
import * as productRepository from "../repositories/product.db.js";

export async function createOrder(data) {
  const product = await productRepository.getProductPriceByID(data.productId);
  if (!product) {
    throw new Error("product doesn't exist.");
  }

  const priceAtPurchase = product.price;
  const order = {
    ...data,
    priceAtPurchase,
  };
  return await orderRepository.createOrder(order);
}

export async function getFilteredOrders(data) {
  const { customerId, productId, page, limit } = data;
  const where = {
    customerId,
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

export async function getFilteredProducts(data) {
  const { sellerId, category, page, limit } = data;

  const where = {
    ...(sellerId && { sellerId: Number(sellerId) }),
    ...(category && { category }),
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

export async function updateOrder(id, data) {
  return await orderRepository.updateOrder(id, data);
}
