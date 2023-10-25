import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetTemperatureController } from "./GetTemperatureController.js";
import { Ip } from "../entities/Ip.js";

describe("GetTemperatureController", () => {
  let getCurrentTemperature;
  let getTemperatureController;
  let notImportant = "1.1.1.1";

  beforeEach(() => {
    getCurrentTemperature = { execute: vi.fn(() => Promise.resolve(20)) };
    getTemperatureController = new GetTemperatureController(
      getCurrentTemperature,
    );
  });

  it("calls the use case with the remote ip", async () => {
    const remoteIp = "::ffff:127.0.0.1";
    const ctx = {
      request: { query: {}, headers: {}, ip: remoteIp },
    };

    await getTemperatureController.execute(ctx);

    expect(getCurrentTemperature.execute).toHaveBeenCalledWith(
      Ip.fromString("127.0.0.1"),
    );
  });

  it("calls the use case with the query params", async () => {
    const queryIp = "127.0.0.1";
    const ctx = {
      request: { query: { ip: queryIp }, headers: {}, ip: notImportant },
    };

    await getTemperatureController.execute(ctx);

    expect(getCurrentTemperature.execute).toHaveBeenCalledWith(
      Ip.fromString(queryIp),
    );
  });

  it("extracts the ip from the headers", async () => {
    const headerIp = "127.0.0.1";
    const ctx = {
      request: {
        query: {},
        headers: { "x-forwarded-for": headerIp },
        ip: notImportant,
      },
    };

    await getTemperatureController.execute(ctx);

    expect(getCurrentTemperature.execute).toHaveBeenCalledWith(
      Ip.fromString(headerIp),
    );
  });

  it("sets the temperature in the body response", async () => {
    const ctx = {
      request: { query: {}, headers: {}, ip: notImportant },
    };

    await getTemperatureController.execute(ctx);

    expect(ctx.body.temperature).toBe(20);
  });
});
