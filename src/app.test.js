import { describe, it, expect } from "vitest";
import supertest from "supertest";
import app from "./app.js";

describe("get temperature", () => {
  it("responds with the current temperature", async () => {
    const res = await supertest(app.callback())
      .get("/temperature")
      .query({ ip: "88.8.82.28" })
      .expect(200);

    expect(res.body.temperature).toBeGreaterThan(7);
    expect(res.body.temperature).toBeLessThan(40);
  });

  it("responds with 400 if ip is not valid", async () => {
    const res = await supertest(app.callback())
      .get("/temperature")
      .query({ ip: "256.1.1.1" })
      .expect(400);

    expect(res.body.error.message).toEqual("Invalid IP address 256.1.1.1");
  });
});
