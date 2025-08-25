import * as sellerService from "../services/seller.service.js";

export async function CreateBrand(req, res) {
  try {
    const sellerId = Number(req.user.id);
    const { name, description, logoUrl, websiteUrl } = req.body;

    const brand = await sellerService.createBrand({
      sellerId,
      name,
      description,
      logoUrl,
      websiteUrl,
    });

    res.status(200).json(brand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function CreateProduct(req, res) {
  try {
    const sellerId = req.user.id;
    const { name, brandId, category, amount = 1, price } = req.body;

    const product = await sellerService.createProduct({
      name,
      category,
      amount,
      price,
      sellerId,
      brandId,
    });

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getFilteredProducts(req, res) {
  try {
    const sellerId = Number(req.user.id);
    const { productId, page = 1, limit = 10 } = req.query;

    const orders = await sellerService.getFilteredProducts({
      sellerId,
      productId,
      page,
      limit,
    });

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getFilteredOrders(req, res) {
  try {
    const sellerId = req.user.id;
    const { productId, page = 1, limit = 10 } = req.query;

    const orders = await sellerService.getFilteredOrders({
      sellerId,
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
    const id = Number(req.param.id);
    const { status } = req.body;

    const order = await customerService.updateOrder({ id, status });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
