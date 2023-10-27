import { GetCurrentTemperature } from './GetCurrentTemperatureAndCountryByIp.js';
import { PositionServiceIpMock } from '../services/PositionServiceIpMock';
import { TemperatureServiceOpenMeteoMock } from '../services/TemperatureServiceOpenMeteoMock';

describe('GetCurrentTemperature', () => {
  let positionService
  let temperatureService
  
  beforeEach(() => {
    positionService = new PositionServiceIpMock();
    temperatureService = new TemperatureServiceOpenMeteoMock();
  });

  
  it('should return fixed temperature and country if ip is local', async () => {
    const localIp = { value: '127.0.0.1' };
    const currentTemperature = new GetCurrentTemperature(positionService, temperatureService);

    const { temperature, country } = await currentTemperature.execute(localIp);
    
    expect(temperature).toBe(24.4);
    expect(country).toBe('Spain');
  });
  it('should return not-fixed temperature and country if ip is not local', async () => {
    const notLocalIp = { value: '111.0.0.1' };
    const currentTemperature = new GetCurrentTemperature(positionService, temperatureService);

    const { temperature, country } = await currentTemperature.execute(notLocalIp);

    expect(temperature).not.toBe(24.4);
    expect(country).not.toBe('Spain');
  })
})