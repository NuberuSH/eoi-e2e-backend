import { describe, it, expect, vi } from "vitest"
import { PostCountryController } from "./PostCountryController.js"
import { ZodError } from "zod"

describe("PostCountryController", () => {
  it("invokes the use case", async () => {
    const registerCountry = { execute: vi.fn() }
    const postCountryController = new PostCountryController(registerCountry)
    const name = "Spain"
    const temperature = 30
    const req = {
      body: {
        name,
        temperature
      },
    }
    const json = vi.fn()
    const res = {
      status: () => ({ json }),
    }

    await postCountryController.execute(req, res)

    expect(registerCountry.execute).toHaveBeenCalledWith(name,
      temperature)
  })

  it("responds with status 200", async () => {
    const registerCountry = { execute: vi.fn() }
    const postCountryController = new PostCountryController(registerCountry)
    const name = "Spain"
    const temperature = 30
    const req = {
      body: {
        name,
        temperature
      },
    }
    const json = vi.fn()
    const res = {
      status: () => ({ json }),
    }

    await postCountryController.execute(req, res)

    await expect(json).toHaveBeenCalledWith({ status: "ok" })
  })

  it("throws a zod error if temperature is not defined", async () => {
    const registerCountry = { execute: vi.fn() }
    const postCountryController = new PostCountryController(registerCountry)
    const name = "Spain"
    const req = {
      body: {
        name,
      },
    }
    const json = vi.fn()
    const res = {
      status: () => ({ json }),
    }

    await postCountryController.execute(req, res)

    await expect(result).rejects.toBeInstanceOf(ZodError)
  })

  it("throws a zod error if name is not defined", async () => {
    const registerCountry = { execute: vi.fn() }
    const postCountryController = new PostCountryController(registerCountry)
    const temperature = 30
    const req = {
      body: {
        temperature,
      },
    }
    const json = vi.fn()
    const res = {
      status: () => ({ json }),
    }

    await postCountryController.execute(req, res)

    await expect(result).rejects.toBeInstanceOf(ZodError)
  })
})