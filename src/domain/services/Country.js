export class Country {
  static create(id, name, temperature) {
    return new Country(id, name, temperature)
  }

  constructor(id, name, temperature) {
    this.id = id
    this.name = name
    this.temperature = temperature
  }

  getId() {
    return this.id
  }

  hasId(id) {
    return this.id === id
  }

  hasName(name) {
    return this.name === name
  }

  hasTemperature(temperature) {
    return this.temperature === temperature
  }
}
