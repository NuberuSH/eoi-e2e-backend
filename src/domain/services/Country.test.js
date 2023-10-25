import { describe, expect, it } from "vitest"
import { Country } from "./Country.js"

describe("Country", () => {
  const notImportantId = "00000000-0000-0000-0000-000000000000"
  const notImportantName = "Spain"
  const notImportantTemperature = 26.7

  it("has an id")

  const countryID = "f969af7f-bc05-46ed-8a82-62a9f49f4927"

  const country = Country.create(countryID, notImportantName, notImportantTemperature)

  expect(country.hasId(countryID)).toBe(true)

  it("has another id", () => {
    const countryId = "f969af7f-bc05-46ed-8a82-62a9f49f4927"
    const otherId = "54124556-9B55-4924-A9A3-51E8B20769C4"

    const country = Country.create(countryId, notImportantName, notImportantTemperature)

    expect(country.hasId(otherId)).toBe(false)
  })

  it("has a name", () => {
    const countryName = "Brazil"

    const country = Country.create(notImportantId, countryName, notImportantTemperature)

    expect(country.hasName(countryName)).toBe(true)
  })

  it("has another name", () => {
    const countryName = "Brazil"
    const othercountryName = "Japan"

    const country = Country.create(notImportantId, countryName, notImportantTemperature)

    expect(country.hasName(othercountryName)).toBe(false)
  })

  it("has a temperature", () => {
    const countryTemperature = 30

    const country = Country.create(notImportantId, notImportantName, countryTemperature)

    expect(country.hasTemperature(countryTemperature)).toBe(true)
  })

  it("has another temperature", () => {
    const countryTemperature = 30
    const othercountryTemperature = 28

    const country = Country.create(notImportantId, notImportantName, countryTemperature)

    expect(country.hasTemperature(othercountryTemperature)).toBe(false)
  })

})