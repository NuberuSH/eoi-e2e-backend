export class TemperatureRepositoryMongo {
    constructor({client = MongoClient} = {}) {
        this.client = client;
        this.database = this.client.db("eoi-e2e");
        this.temperatures = this.database.collection("temperatures");
    }

    async connect() {
        await this.client.connect();
    }

    async disconnect() {
        await this.client.close();
    }

    async reset() {
        await this.temperatures.deleteMany({});
    }

    async save(temperature) {
        await this.temperatures.insertOne({...temperature});
    }

    async findByCountry(country) {
        const temperatures = await this.temperatures.find({country}).toArray();
        return temperatures.map((temperature) => ({
            ...temperature,
            date: new Date(temperature.date),
        }));
    }
}
