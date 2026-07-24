export type CourtWeather = {
  temperature: number;
  feelsLike: number;
  precipitationChance: number;
  windSpeed: number;
  label: string;
  icon: "clear" | "cloudy" | "rain" | "snow";
};

function describeWeather(code: number): Pick<CourtWeather, "label" | "icon"> {
  if (code === 0) return { label: "Clear", icon: "clear" };
  if (code <= 3) return { label: code === 1 ? "Mostly clear" : "Cloudy", icon: "cloudy" };
  if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) {
    return { label: "Snow", icon: "snow" };
  }
  if (code >= 51) return { label: code >= 95 ? "Storms" : "Rain", icon: "rain" };
  return { label: "Cloudy", icon: "cloudy" };
}

export async function getCourtWeather([longitude, latitude]: [number, number]): Promise<CourtWeather | null> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m",
    hourly: "precipitation_probability",
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    forecast_days: "1",
    timezone: "auto",
  });

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
      next: { revalidate: 600 },
    });
    if (!response.ok) return null;

    const data = await response.json() as {
      current?: {
        temperature_2m?: number;
        apparent_temperature?: number;
        weather_code?: number;
        wind_speed_10m?: number;
        time?: string;
      };
      hourly?: { time?: string[]; precipitation_probability?: number[] };
    };
    if (typeof data.current?.temperature_2m !== "number") return null;

    const currentHour = data.current.time?.slice(0, 13);
    const hourIndex = currentHour ? data.hourly?.time?.findIndex((time) => time.startsWith(currentHour)) ?? -1 : -1;
    const precipitationChance = hourIndex >= 0
      ? data.hourly?.precipitation_probability?.[hourIndex] ?? 0
      : 0;
    const description = describeWeather(data.current.weather_code ?? 0);

    return {
      temperature: Math.round(data.current.temperature_2m),
      feelsLike: Math.round(data.current.apparent_temperature ?? data.current.temperature_2m),
      precipitationChance: Math.round(precipitationChance),
      windSpeed: Math.round(data.current.wind_speed_10m ?? 0),
      ...description,
    };
  } catch {
    return null;
  }
}
