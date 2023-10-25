export const config = {
  mongo: {
    user: "admin",
    password: process.env.MONGO_PASSWORD || "password",
    address: "localhost",
    port: "27017",
  },
}