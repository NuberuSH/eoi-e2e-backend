export class GetCurrentTemperature {
  static FIXED_TEMPERATURE = 24.4;

  constructor(positionService, temperatureService) {
    this.positionService = positionService;
    this.temperatureService = temperatureService;
  }

  async execute(ip) {
    if (ip.isLocalhost()) {
      return GetCurrentTemperature.FIXED_TEMPERATURE;
    }

    const position = await this.positionService.getByIp(ip);

    const temperature =
      await this.temperatureService.temperatureAtPosition(position);

    return temperature;
  }
}
