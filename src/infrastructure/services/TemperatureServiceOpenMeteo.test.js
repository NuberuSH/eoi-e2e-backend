import { describe, it, expect } from "vitest";
import { TemperatureServiceOpenMeteo } from "./TemperatureServiceOpenMeteo.js";

describe("TemperatureServiceOpenMeteo", () => {
  it("gets the temperature of the given position", async () => {
    const temperatureService = new TemperatureServiceOpenMeteo();
    const position = { latitude: 28.4666, longitude: -16.3027 };

    const temperature = await temperatureService.temperatureAtPosition(
      position
    );

    expect(temperature).toBeGreaterThan(7);
    expect(temperature).toBeLessThan(40);
  });

  it("fails if the position is out of range", async () => {
    const temperatureService = new TemperatureServiceOpenMeteo();
    const position = { latitude: 999999, longitude: 999999 };

    const result = temperatureService.temperatureAtPosition(position);

    expect(result).rejects.toEqual(
      new Error("Latitude must be in range of -90 to 90°. Given: 999999.0.")
    );
  });
});
