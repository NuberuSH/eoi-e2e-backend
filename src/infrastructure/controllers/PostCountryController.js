import * as z from "zod";

const schema = z.object({
  name: z.string(),
  temperature: z.number(),
});

export class PostCountryController {
  constructor(registerCountry) {
    this.registerCountry = registerCountry;
  }

  execute = async (ctx) => {
    const { name, temperature } = ctx.body;

    if (!name || !temperature) {
      console.log("Invalid request body");
      ctx.status = 400;
      ctx.body = { error: "Invalid request body" };
      return;
    }

    try {
      console.log(
        "Executing registerCountry with name:",
        name,
        "and temperature:",
        temperature,
      );
      await this.registerCountry.execute(name, temperature);
      console.log("Registration successful.");
      ctx.status = 201;
      ctx.body = { status: "ok" };
    } catch (error) {
      console.error("Error while executing registerCountry:", error);
      ctx.status = 500;
      ctx.body = { error: "Internal Server Error" };
    }
  };
}
