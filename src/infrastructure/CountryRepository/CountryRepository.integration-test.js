import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import { CountryRepositoryMongo } from "./CountryRepositoryMongo.js";
import { Country } from "../../domain/services/Country.js";

describe.each([["Mongo", CountryRepositoryMongo]])(
  "CountryRepository%s",
  (name, CountryRepository) => {
    let countryRepository;

    beforeAll(async () => {
      countryRepository = new CountryRepository();
      await countryRepository.connect();
    });

    afterAll(async () => {
      await countryRepository.disconnect();
    });

    beforeEach(async () => {
      await countryRepository.reset();
    });

    it("saves a country in the database and after find by id", async () => {
      const id = "00000000-0000-0000-0000-000000000000";
      const name = "Spain";
      const temperature = 30;
      const country = new Country(id, name, temperature);

      await countryRepository.save(country);

      const savedCountry = await countryRepository.findById(id);
      expect(savedCountry).toEqual(country);
    });

    it("findById returns null if country not found", async () => {
      const id = "00000000-0000-0000-0000-000000000000";

      const savedCountry = await countryRepository.findById(id);

      expect(savedCountry).toEqual(null);
    });

    it("deletes a country from the database", async () => {
      const id = "00000000-0000-0000-0000-000000000000";

      const country = new Country(id, "Spain", 30);
      await countryRepository.save(country);

      await countryRepository.deleteCountry(id);

      const deletedCountry = await countryRepository.findById(id);
      expect(deletedCountry).toEqual(null);
    });

    it("updates a country in the database", async () => {
      const id = "00000000-0000-0000-0000-000000000000";
      const originalName = "Spain";
      const updatedName = "New Spain";

      const country = new Country(id, originalName, 30);
      await countryRepository.save(country);

      await countryRepository.update(id, { name: updatedName });

      const updatedCountry = await countryRepository.findById(id);
      expect(updatedCountry.name).toEqual(updatedName);
    });
  },
);
