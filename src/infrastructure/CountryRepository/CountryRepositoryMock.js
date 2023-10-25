import { CountryRepository } from "../../domain/repositories/CountryRepository.js"

export class CountryRepositoryMock extends CountryRepository {
  save() { }

  findById() { }

  delete() { }

  update() { }
}