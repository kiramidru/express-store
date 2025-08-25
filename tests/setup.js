import prisma from "../prisma.js";
import { hashData } from "../utils/bcrpyt.js";

const testAdminData = {
  email: "testadmin@gmail.com",
  password: await hashData("testing123"),
  firstName: "admin123",
  role: "ADMIN",
};

const testSellerData = {
  email: "testseller@gmail.com",
  password: await hashData("testing123"),
  firstName: "seller123",
  role: "SELLER",
};

const testCustomerData = {
  email: "testcustome@gmail.com",
  password: await hashData("testing123"),
  firstName: "customer123",
  role: "CUSTOMER",
};

beforeAll(async () => {
  const admin = await prisma.user.upsert({
    where: { email: testAdminData.email },
    update: {},
    create: testAdminData,
  });
  const seller = await prisma.user.upsert({
    where: { email: testSellerData.email },
    update: {},
    create: testSellerData,
  });
  const customer = await prisma.user.upsert({
    where: { email: testCustomerData.email },
    update: {},
    create: testCustomerData,
  });

  global.testAdmin = admin;
  global.testSeller = seller;
  global.testCustomer = customer;
});

afterAll(async () => {
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.product.deleteMany();
  await prisma.order.deleteMany();

  await prisma.$disconnect();
});
