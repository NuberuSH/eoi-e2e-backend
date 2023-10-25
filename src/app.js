import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import { GetCurrentTemperature } from "./use-cases/GetCurrentTemperature.js";
import { PositionServiceIpApi } from "./domain/services/PositionServiceIpApi.js";
import { TemperatureServiceOpenMeteo } from "./domain/services/TemperatureServiceOpenMeteo.js";
import { GetTemperatureController } from "./infrastructure/controllers/GetTemperatureController.js";
import { PostCountryController } from "./infrastructure/controllers/PostCountryController.js";
import { InvalidIpError } from "./domain/errors/InvalidIpError.js";
import { RegisterCountry } from "./application/RegisterCountry.js";
import { IdGeneratorNode } from "./infrastructure/IdGenerator/IdGeneratorNode.js";
import { CountryRepositoryMongo } from "./infrastructure/CountryRepository/CountryRepositoryMongo.js";

const app = new Koa();
const router = new Router();

const positionService = new PositionServiceIpApi();
const temperatureService = new TemperatureServiceOpenMeteo();
const getCurrentTemperature = new GetCurrentTemperature(
  positionService,
  temperatureService,
);
const getTemperatureController = new GetTemperatureController(
  getCurrentTemperature,
);
const idGenerator = new IdGeneratorNode();
const countryRepository = new CountryRepositoryMongo();
const registerCountry = new RegisterCountry(countryRepository, idGenerator);
const postCountryController = new PostCountryController(registerCountry);

router.get("/temperature", getTemperatureController.execute);
router.post("/country", postCountryController.execute);

app
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      handleError(ctx, error);
    }
  })
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

function handleError(ctx, error) {
  switch (error.constructor) {
    case InvalidIpError:
      ctx.response.status = 400;
      ctx.body = {
        error: {
          message: error.message,
        },
      };
      break;
    default:
      throw error;
  }
}

export default app;
