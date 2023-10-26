export class CountryRepository {
  /**
   * Saves the country
   * @param {country} country
   * @returns {Promise<void>}
   */
  // eslint-disable-next-line no-unused-vars
  async save(Country) {
    throw new Error("This is an abstract class. You should implement the save method")
  }

  /**
   * Finds the country by id
   * @param {string} id
   * @returns {Promise<country | null>}
   */
  // eslint-disable-next-line no-unused-vars
  async findById(id) {
    throw new Error("This is an abstract class. You should implement the findByIp method")
  }

  async findByName(name){
    throw new Error("This is an abstract class. You should implement the findByName method")
  }

  /**
   * delete the country
   * @param {country} country
   * @returns {Promise<void>}
  */
  // eslint-disable-next-line no-unused-vars
  async delete(Country) {
    throw new Error("This is an abstract class. You should implement the delete method")
  }

  /**
   * delete the country
   * @param {country} country
   * @returns {Promise<void>}
  */
  // eslint-disable-next-line no-unused-vars
  async update(Country) {
    throw new Error("This is an abstract class. You should implement the update method")
  }

}