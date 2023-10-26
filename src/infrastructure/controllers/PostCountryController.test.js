import { describe, it, expect, vi, beforeEach } from "vitest";
import { PostCountryController } from "./PostCountryController.js";
import { ZodError } from "zod";

describe("PostCountryController", () => {
  let res;
  let json;
  let registerCountry;
  let postCountryController;

  beforeEach(() => {
    json = vi.fn();
    res = {
      status: () => ({ json }),
    };
    registerCountry = { execute: vi.fn() };
    postCountryController = new PostCountryController(registerCountry);
  });

  it("calls registerCountry with the correct parameters", async () => {
    const name = "Spain";
    const temperature = 30;
    const req = {
      body: {
        name,
        temperature,
      },
    };

    await postCountryController.execute(req, res);

    await expect(registerCountry.execute).toHaveBeenCalledWith(
      name,
      temperature,
    );
  });

  it("responds with status 200", async () => {
    const registerCountry = { execute: vi.fn() };
    const postCountryController = new PostCountryController(registerCountry);
    const name = "Spain";
    const temperature = 30;
    const req = {
      body: {
        name,
        temperature,
      },
    };
    const json = vi.fn();
    const res = {
      status: () => ({ json }),
    };

    await postCountryController.execute(req, res);

    await expect(json).toHaveBeenCalledWith({ status: "ok" });
  });

  it("throws a zod error if temperature is not defined", async () => {
    const registerCountry = { execute: vi.fn() };
    const postCountryController = new PostCountryController(registerCountry);
    const name = "Spain";
    const req = {
      body: {
        name,
      },
    };
    const json = vi.fn();
    const res = {
      status: () => ({ json }),
    };

    const result = postCountryController.execute(req, res);

    await expect(result).rejects.toBeInstanceOf(ZodError);
  });

  it("throws a zod error if name is not defined", async () => {
    const registerCountry = { execute: vi.fn() };
    const postCountryController = new PostCountryController(registerCountry);
    const temperature = 30;
    const req = {
      body: {
        temperature,
      },
    };
    const json = vi.fn();
    const res = {
      status: () => ({ json }),
    };

    const result = postCountryController.execute(req, res);

    await expect(result).rejects.toBeInstanceOf(ZodError);
  });
});
