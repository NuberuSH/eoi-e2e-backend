import { GetCurrentTemperature } from './GetCurrentTemperature';

describe('GetCurrentTemperature', () => {
  it('should return FIXED_TEMPERATURE for local IP', async () => {
    const getCurrentTemperature = new GetCurrentTemperature();

    const result = await getCurrentTemperature.execute('127.0.0.1');

    expect(result).toBe(GetCurrentTemperature.FIXED_TEMPERATURE);
  });

  it('should call PositionService and TemperatureService for non-local IP', async () => {

    const positionServiceMock = {
      getByIp: vi.fn().mockResolvedValue('SamplePosition'),
    };

    const temperatureServiceMock = {
      temperatureAtPosition: vi.fn().mockResolvedValue(25.5),
    };

    const getCurrentTemperature = new GetCurrentTemperature(
      positionServiceMock,
      temperatureServiceMock
    );

    const result = await getCurrentTemperature.execute('192.168.1.1');

    expect(positionServiceMock.getByIp).toHaveBeenCalledWith('192.168.1.1');
    expect(temperatureServiceMock.temperatureAtPosition).toHaveBeenCalledWith('SamplePosition');
    expect(result).toBe(25.5);
  });
});