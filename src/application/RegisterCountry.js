import { Country } from "../domain/entities/Country.js";

export class RegisterCountry {
  /**
   *
   * @param {CountryRepository} countryRepository
   * @param idGenerator
   */
  constructor(countryRepository, idGenerator) {
    this.countryRepository = countryRepository;
    this.idGenerator = idGenerator;
  }

  async execute(name, temperature) {
    const alreadyExists = await this.countryRepository.findByName(name);

    if (alreadyExists) {
      throw new Error("Country already exists");
    }

    const country = Country.create(
      this.idGenerator.generate(),
      name,
      temperature,
    );

    await this.countryRepository.save(country);
  }
}
