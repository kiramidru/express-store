import bcrypt from "bcrypt";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { userId: 123456789 },
    update: {},
    create: {
      userId: 1,
      firstName: "Jane",
      lastName: "Doe",
      username: "janedoe",
    },
  });

  const seller = await prisma.user.upsert({
    where: { userId: 123456789 },
    update: {},
    create: {
      userId: 2,
      firstName: "Jane",
      lastName: "Doe",
      username: "janedoe",
    },
  });

  const customer = await prisma.user.upsert({
    where: { userId: 123456789 },
    update: {},
    create: {
      userId: 3,
      firstName: "Jane",
      lastName: "Doe",
      username: "janedoe",
      role: "CUSTOMER"
    },
  });

  const category = await prisma.category.upsert({
    where: { name: "test_category" },
    update: {},
    create: {
      name: "test_category",
    },
  });

  const subCategory = await prisma.category.upsert({
    where: { name: "test2_category" },
    update: {},
    create: {
      name: "test2_category",
      parentId: category.id,
    },
  });

  const brand = await prisma.brand.upsert({
    where: { name: "test_brand" },
    update: {},
    create: {
      name: "test_brand",
      description: "testing",
      logoUrl: "www.google.com",
      websiteUrl: "www.google.com",
      sellerId: seller.id,
    },
  });

  const product = await prisma.product.upsert({
    where: { name: "test_product" },
    update: {},
    create: {
      name: "test_product",
      description: "testing",
      brandId: brand.id,
      sellerId: seller.id,
      amount: 10,
      price: 100,
    },
  });

  const order = await prisma.order.create({
    data: {
      customerId: customer.id,
      productId: product.id,
      amount: 1,
      priceAtPurchase: 100,
    },
  });

  console.log("✅ Seed data created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
