import { CountryRepository } from "../../domain/repositories/CountryRepository.js";
import { mongoClient } from "./MongoClient.js";
import { Country } from "../../domain/services/Country.js";

export class CountryRepositoryMongo extends CountryRepository {
  isConnected = false;
  client;
  database;
  countries;

  constructor() {
    super();
    this.client = mongoClient;
    this.database = this.client.db("eoi-e2e-back");
    this.countries = this.database.collection("countries");
  }

  async connect() {
    await this.client.connect();
    this.isConnected = true;
  }

  async disconnect() {
    await this.client.close();
  }

  async reset() {
    this.ensureIsConnected();
    await this.countries.deleteMany({});
  }

  async save(country) {
    this.ensureIsConnected();
    await this.countries.insertOne({ ...country });
  }

  async findById(id) {
    this.ensureIsConnected();
    const savedCountry = await this.countries.findOne({ id });

    if (!savedCountry) {
      return null;
    }

    return new Country(
      savedCountry.id,
      savedCountry.name,
      savedCountry.temperature,
    );
  }

  async deleteCountry(id) {
    this.ensureIsConnected();
    const result = await this.countries.deleteOne({ id });

    return result.deletedCount === 1;
  }

  async update(id, countryData) {
    this.ensureIsConnected();
    const result = await this.countries.updateOne(
      { id },
      { $set: countryData },
    );

    return result.modifiedCount === 1;
  }

  ensureIsConnected() {
    if (!this.isConnected) {
      throw new Error("CountryRepositoryMongo is not connected");
    }
  }
}
