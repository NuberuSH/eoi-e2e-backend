export class GetCurrentTemperature {
  constructor(positionService, temperatureService) {
    this.positionService = positionService;
    this.temperatureService = temperatureService;
  }

  async execute(ip) {
    const position = await this.positionService.getByIp(ip);
    const temperature = await this.temperatureService.temperatureAtPosition(
      position
    );

    return temperature;
  }
}
