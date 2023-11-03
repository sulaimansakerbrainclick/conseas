import axios from "axios";

export const getCountryCodeByIp = async (ip: string) => {
  return axios.get(`http://ip-api.com/json/${ip}`).then((response) => response.data.countryCode);
};

const getCountryCode = async (ip: string | null) => {
  if (ip && ip !== "::1") {
    return await getCountryCodeByIp(ip);
  }

  return null;
};

export default getCountryCode;
