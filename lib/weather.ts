import type { Beach } from "./beaches";

export type BeachWeather = {
  updatedAt: string;
  temperature: number;
  windSpeed: number;
  windDirection: string;
  condition: string;
  weatherCode: number;
  waterTemperature: number | null;
  waveHeight: number | null;
  forecast: Array<{ date: string; high: number; low: number; wind: number; wave: number | null; condition: string }>;
};

const weatherDescriptions: Record<number, string> = {
  0: "Clear", 1: "Mostly clear", 2: "Partly cloudy", 3: "Cloudy", 45: "Foggy", 48: "Foggy",
  51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle", 61: "Light rain", 63: "Rain", 65: "Heavy rain",
  71: "Light snow", 73: "Snow", 75: "Heavy snow", 80: "Rain showers", 81: "Rain showers", 82: "Heavy showers", 95: "Thunderstorms",
};

function compass(degrees: number) {
  const points = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return points[Math.round(degrees / 45) % 8];
}

function apiUrl(kind: "weather" | "marine") {
  const key = process.env.OPEN_METEO_API_KEY;
  if (key) return kind === "weather" ? "https://customer-api.open-meteo.com/v1/forecast" : "https://customer-marine-api.open-meteo.com/v1/marine";
  return kind === "weather" ? "https://api.open-meteo.com/v1/forecast" : "https://marine-api.open-meteo.com/v1/marine";
}

export async function getBeachWeather(beach: Beach): Promise<BeachWeather> {
  const key = process.env.OPEN_METEO_API_KEY;
  const common = `latitude=${beach.latitude}&longitude=${beach.longitude}&timezone=America%2FLos_Angeles&forecast_days=7${key ? `&apikey=${encodeURIComponent(key)}` : ""}`;
  const weatherUrl = `${apiUrl("weather")}?${common}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=mph`;
  const marineUrl = `${apiUrl("marine")}?${common}&current=wave_height,sea_surface_temperature&daily=wave_height_max&length_unit=imperial&temperature_unit=fahrenheit`;

  const [weatherResponse, marineResponse] = await Promise.all([
    fetch(weatherUrl, { next: { revalidate: 900 } }),
    fetch(marineUrl, { next: { revalidate: 900 } }),
  ]);
  if (!weatherResponse.ok) throw new Error(`Weather provider returned ${weatherResponse.status}`);

  const weather = await weatherResponse.json();
  const marine = marineResponse.ok ? await marineResponse.json() : null;
  const forecast = weather.daily.time.map((date: string, index: number) => ({
    date,
    high: Math.round(weather.daily.temperature_2m_max[index]),
    low: Math.round(weather.daily.temperature_2m_min[index]),
    wind: Math.round(weather.daily.wind_speed_10m_max[index]),
    wave: marine?.daily?.wave_height_max?.[index] == null ? null : Math.round(marine.daily.wave_height_max[index] * 10) / 10,
    condition: weatherDescriptions[weather.daily.weather_code[index]] ?? "Variable",
  }));

  return {
    updatedAt: weather.current.time,
    temperature: Math.round(weather.current.temperature_2m),
    windSpeed: Math.round(weather.current.wind_speed_10m),
    windDirection: compass(weather.current.wind_direction_10m),
    condition: weatherDescriptions[weather.current.weather_code] ?? "Variable",
    weatherCode: weather.current.weather_code,
    waterTemperature: marine?.current?.sea_surface_temperature == null ? null : Math.round(marine.current.sea_surface_temperature),
    waveHeight: marine?.current?.wave_height == null ? null : Math.round(marine.current.wave_height * 10) / 10,
    forecast,
  };
}
