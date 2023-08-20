import { describe, it, expect } from "vitest";
import { PositionServiceIpApi } from "./PositionServiceIpApi.js";
import { Ip } from "../entities/Ip.js";

describe("PositionServiceIpApi", () => {
  it("gets the position by ip", async () => {
    const positionService = new PositionServiceIpApi();

    const position = await positionService.getByIp(Ip.fromString("88.8.82.28"));

    expect(position).toEqual({ latitude: 28.4666, longitude: -16.3027 });
  });

  it("fails if it's localhost", async () => {
    const positionService = new PositionServiceIpApi();

    const result = positionService.getByIp(Ip.fromString("127.0.0.1"));

    expect(result).rejects.toEqual(new Error("reserved range"));
  });
});
