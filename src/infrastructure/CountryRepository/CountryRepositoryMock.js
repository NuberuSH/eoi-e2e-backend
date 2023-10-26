import { CountryRepository } from "../../domain/repositories/CountryRepository.js"

export class CountryRepositoryMock extends CountryRepository {
  save() { }

  findById() { }

  findByName(){}

  delete() { }

  update() { }
}