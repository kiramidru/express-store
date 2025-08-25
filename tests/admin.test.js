import request from "supertest";
import app from "../app.js";
import { generateTestToken } from "./helpers/auth.js";

const token = generateTestToken({
  userId: global.testAdmin,
  role: "ADMIN",
});

describe("POST /admin/category", () => {
  it("should return 200", async () => {
    const res = await request(app)
      .post("/api/admin/category")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "food",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name");
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app)
      .post("/api/admin/category")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});
