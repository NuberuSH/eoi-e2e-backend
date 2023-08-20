import { Ip } from "../entities/Ip.js";

export class GetTemperatureController {
  constructor(getCurrentTemperature) {
    this.getCurrentTemperature = getCurrentTemperature;
  }

  execute = async (ctx) => {
    const queryIp = ctx.request.query.ip;
    const remoteIp = ctx.request.ip.replace("::ffff:", "");
    const headerIp = ctx.request.headers["x-forwarded-for"];
    const ip = Ip.fromString(queryIp ?? headerIp ?? remoteIp);

    const temperature = await this.getCurrentTemperature.execute(ip);

    ctx.body = {
      temperature,
    };
  };
}
