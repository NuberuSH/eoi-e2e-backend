export class PositionServiceIpApi {
  /**
   *
   * @param {Ip} ip
   */
  async getByIp(ip) {
    const response = await fetch(`http://ip-api.com/json/${ip.value}`);
    const data = await response.json();

    if (data.status === "fail") {
      throw new Error(data.message);
    }

    return { latitude: data.lat, longitude: data.lon, country: data.country };
  }
}
