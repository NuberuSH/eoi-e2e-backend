import { describe, it, expect } from "vitest";
import { PositionServiceIpApi } from "./PositionServiceIpApi.js";
import { Ip } from "../entities/Ip.js";

describe("PositionServiceIpApi", () => {
  it("gets the position, the country name and the ip", async () => {
    const positionService = new PositionServiceIpApi();

    const {latitude, longitude, country} = await positionService.getByIp(Ip.fromString("88.8.82.28"));

    expect(latitude).toBeLessThanOrEqual(28.47);
    expect(latitude).toBeGreaterThanOrEqual(28.46);
    expect(longitude).toBeLessThanOrEqual(-16.29);
    expect(longitude).toBeGreaterThanOrEqual(-16.3);
    expect(country).toEqual("Spain");
  });

  it("fails if it's localhost", async () => {
    const positionService = new PositionServiceIpApi();

    const result = positionService.getByIp(Ip.fromString("127.0.0.1"));

    expect(result).rejects.toEqual(new Error("reserved range"));
  });
});
