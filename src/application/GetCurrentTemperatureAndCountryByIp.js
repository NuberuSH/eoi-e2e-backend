export class GetCurrentTemperature {
  static FIXED_TEMPERATURE = 24.4;
  static FIXED_COUNTRY = 'Spain';

  constructor(positionService, temperatureService) {
    this.positionService = positionService;
    this.temperatureService = temperatureService;
  }

  async execute(ip) {
    if (ip.isLocal()) {
      return {temperature: GetCurrentTemperature.FIXED_TEMPERATURE, country: GetCurrentTemperature.FIXED_COUNTRY}
    }

    const {latitud, longitud, country} = await this.positionService.getByIp(ip);

    const position = {latitud, longitud };

    const temperature =
      await this.temperatureService.temperatureAtPosition(position);

    return {temperature, country}
  }
}
