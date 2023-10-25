import { Country } from "../domain/services/Country.js";

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
      throw new error("Country already exists");
    }

    const country = country.create(
      this.idGenerator.generate(),
      name,
      temperature,
    );

    await this.countryRepository.save(country);
  }
}
