export class TemperatureServiceOpenMeteo {
  async temperatureAtPosition(position) {
    const urlSearchParams = new URLSearchParams({
      latitude: position.latitude,
      longitude: position.longitude,
      current_weather: true,
    });

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?${urlSearchParams}`
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.reason);
    }

    return data.current_weather.temperature;
  }
}
