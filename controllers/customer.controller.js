import * as customerService from "../services/customer.service.js";

export async function CreateOrder(req, res) {
  try {
    const customerId = req.user.id;
    const { productId, amount = 1 } = req.body;

    const order = await customerService.createOrder({
      customerId,
      productId,
      amount,
    });

    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getFilteredOrders(req, res) {
  try {
    const customerId = req.user.id;
    const { productId, page = 1, limit = 10 } = req.query;

    const orders = await customerService.getFilteredOrders({
      customerId,
      productId,
      page,
      limit,
    });

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateOrder(req, res) {
  try {
    const { id, status } = req.body;

    const order = await customerService.updateOrder(id, { status });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getFilteredProducts(req, res) {
  try {
    const { sellerId, categoryId, page = 1, limit = 10 } = req.query;

    const orders = await customerService.getFilteredProducts({
      sellerId,
      categoryId,
      page,
      limit,
    });

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export function getProfile(req, res) {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
