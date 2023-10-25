import * as z from "zod";

const schema = z.object({
  name: z.string(),
  temperature: z.number(),
});

export class PostCountryController {
  constructor(registerCountry) {
    this.registerCountry = registerCountry;
  }

  execute = async (req, res) => {
    console.log(req.body);
    const { name, temperature } = schema.parse(req.body);

    await this.registerCountry.execute(name, temperature);

    res.status(201).json({ status: "ok" });
  };
}
