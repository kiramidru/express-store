import prisma from "../prisma.js";

export async function createOrder(data) {
  return await prisma.order.create({ data });
}

export async function getFilteredOrders(where, skip, take) {
  return await prisma.order.findMany({ where, skip, take });
}
export async function getOrderByID(id) {
  return await prisma.order.findUnique({ where: { id } });
}

export async function updateOrder(id, data) {
  return await prisma.order.update({ where: { id }, data });
}

export async function getOrderCount(where) {
  return await prisma.order.count({ where });
}
