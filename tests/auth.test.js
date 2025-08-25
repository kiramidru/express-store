import request from "supertest";
import app from "../app.js";

describe("POST /signup", () => {
  it("should return 200", async () => {
    const res = await request(app).post("/api/signup").send({
      email: "randomtest123@gmail.com",
      password: "random123",
      firstName: "randomname",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email");
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app).post("/api/signup");

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});

describe("POST /login", () => {
  it("should return 200", async () => {
    const res = await request(app).post("/api/login").send({
      email: "testadmin@gmail.com",
      password: "testing123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app).post("/api/login");

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});
