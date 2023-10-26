import { describe, it, expect, vi, beforeEach } from "vitest"
import { CountryRepositoryMock } from "../infrastructure/CountryRepository/CountryRepositoryMock.js"
import { RegisterCountry } from "./RegisterCountry.js"
import { Country } from "../domain/services/Country.js"
import { IdGeneratorMock } from "../infrastructure/IdGenerator/IdGeneratorMock.js"

describe("RegisterCountry", () => {
  let countryRepository
  let idGenerator
  let registerCountry
  const notImportantName = "Spain"
  const notImportantTemperature = 30

  beforeEach(() => {
    countryRepository = new CountryRepositoryMock()
    vi.spyOn(countryRepository, "save")
    idGenerator = new IdGeneratorMock()
    registerCountry = new RegisterCountry(countryRepository, idGenerator)
  })

  it("must save the country in the repository", async () => {
    await registerCountry.execute(notImportantName, notImportantTemperature)

    expect(countryRepository.save).toHaveBeenCalled()
  })

  it("must save the country with the correct data", async () => {
    const name = "Spain"
    const temperature = 30

    await registerCountry.execute(name, temperature)

    const country = Country.create(IdGeneratorMock.MOCK_ID, name, temperature)
    expect(countryRepository.save).toHaveBeenCalledWith(country)
  })

  it("must throw an error if the country already exists", async () => {
    vi.spyOn(countryRepository, "findByName").mockResolvedValue(true)
    const result = registerCountry.execute(notImportantName, notImportantTemperature)

    await expect(result).rejects.toThrow("Country already exists")
  })

})